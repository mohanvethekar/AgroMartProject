from flask import Flask,request,Markup
import pymysql
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import pathlib
import json
from datetime import date
import pandas as pd
import numpy as np
from utils.disease import disease_dic

from torchvision import transforms
from PIL import Image
from utils.model import ResNet9
import io
import torch

import pickle
import requests
import config

import threading
lock = threading.Lock()

from utils.fertilizer import fertilizer_dic

app = Flask(__name__)

UPLOAD_FOLDER = 'static/files/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)
app.secret_key = 'any random string'

def dbConnection():
    try:
        connection = pymysql.connect(host="localhost", user="root", password="root", database="reactplant")
        return connection
    except:
        print("Something went wrong in database Connection")

def dbClose():
    try:
        dbConnection().close()
    except:
        print("Something went wrong in Close DB Connection")

con = dbConnection()
cursor = con.cursor()

"----------------------------------------------------------------------------------------------------"

@app.route('/userRegister', methods=['GET', 'POST'])
def userRegister():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        mobile = data.get('mobile')
        password = data.get('password')
        
        cursor.execute('SELECT * FROM users WHERE username = %s', (username))
        count = cursor.rowcount
        if count == 1:        
            return "fail"
        else:
            sql1 = "INSERT INTO users(username, email, mobile, password) VALUES (%s, %s, %s, %s);"
            val1 = (username, email, mobile, password)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/userLogin', methods=['GET', 'POST'])
def userLogin():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
        count = cursor.rowcount
        if count == 1:        
            return "success"
        else:
            return "fail"
    return "fail"

@app.route('/addProduct', methods=['GET', 'POST'])
def addProduct():
    if request.method == 'POST':
        print("POST")
        f1 = request.files["File"]
        pname = request.form["pname"]
        pcategory = request.form["pcategory"]
        pdate = request.form["pdate"]
        pprize = request.form["pprize"]
        description = request.form["description"]
        instruction = request.form["instruction"]
        username = request.form["user"]
        
        filename_secure1 = secure_filename(f1.filename)
        
        pathlib.Path(app.config['UPLOAD_FOLDER'], username).mkdir(exist_ok=True)
        f1.save(os.path.join(app.config['UPLOAD_FOLDER'],username,filename_secure1)) 
        
        sql1 = "INSERT INTO productdetails(uploader,filename,pname,pcat,pdate,pprize,description,instruction) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
        val1 = (username,"static/files/"+username+"/"+filename_secure1,pname,pcategory,pdate,pprize,description,instruction)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"
        
    return "fail"

@app.route('/loadAllProduct/<username>', methods=['GET', 'POST'])
def loadAllProduct(username):
    try:
        lock.acquire()
        cursor.execute('SELECT * FROM productdetails WHERE uploader != %s', (username))
        row = cursor.fetchall() 
        lock.release()
        # print(row)
        
        catlst = []
        for i in row:
            if i[4] not in catlst:
                catlst.append(i[4])
        
        jsonObj = json.dumps([row,catlst])         
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/searchProduct/<username>/<prize>/<category>', methods=['GET', 'POST'])
def searchProduct(username,prize,category):
    try:
        
        if prize == 'None':
            lock.acquire()
            cursor.execute('SELECT * FROM productdetails WHERE uploader != %s and pcat = %s', (username,category))
            row = cursor.fetchall() 
            lock.release()           
            
        elif category == 'None':
            lock.acquire()
            cursor.execute('SELECT * FROM productdetails WHERE uploader != %s and pprize < %s', (username,int(prize)))
            row = cursor.fetchall() 
            lock.release()           
            
        else:   
            lock.acquire()
            cursor.execute('SELECT * FROM productdetails WHERE uploader != %s and pprize < %s and pcat = %s', (username,int(prize),category))
            row = cursor.fetchall() 
            lock.release()           
        
            # print("--------------------")
            # print(prize)
            # print(category)
            # print(row)
            # print("--------------------")
        # print(row)
        
        jsonObj = json.dumps(row)         
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/editProduct/<val>', methods=['GET', 'POST'])
def editProduct(val):
    try:   
        print(val)
        if val == 'all':            
            lock.acquire()
            cursor.execute('SELECT * FROM productdetails')
            row = cursor.fetchall() 
            lock.release()
        else:            
            lock.acquire()
            cursor.execute('SELECT * FROM productdetails WHERE uploader = %s', (val))
            row = cursor.fetchall() 
            lock.release()
            
        jsonObj = json.dumps(row)         
        return jsonObj            
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/edit', methods=['GET', 'POST'])
def edit():
    if request.method == 'POST':
        print("POST")
        f1 = request.files["File"]
        idofp = request.form["id"]
        pname = request.form["pname"]
        pcategory = request.form["pcategory"]
        pdate = request.form["pdate"]
        pprize = request.form["pprize"]
        description = request.form["description"]
        instruction = request.form["instruction"]
        username = request.form["user"]
        
        print(username)
        
        filename_secure1 = secure_filename(f1.filename)
        
        pathlib.Path(app.config['UPLOAD_FOLDER'], username).mkdir(exist_ok=True)
        f1.save(os.path.join(app.config['UPLOAD_FOLDER'],username,filename_secure1)) 
        
        sql1 = "UPDATE productdetails SET filename = %s, pname = %s, pcat = %s, pdate = %s, pprize = %s, description = %s, instruction = %s WHERE id = %s;"
        val1 = ("static/files/"+username+"/"+filename_secure1,pname,pcategory,pdate,pprize,description,instruction,idofp)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"  
    
@app.route('/edit1', methods=['GET', 'POST'])
def edit1():
    if request.method == 'POST':
        print("POST")
        idofp = request.form["id"]
        pname = request.form["pname"]
        pcategory = request.form["pcategory"]
        pdate = request.form["pdate"]
        pprize = request.form["pprize"]
        description = request.form["description"]
        instruction = request.form["instruction"]
        username = request.form["user"]
        print(username)
                
        sql1 = "UPDATE productdetails SET pname = %s, pcat = %s, pdate = %s, pprize = %s, description = %s, instruction = %s WHERE id = %s;"
        val1 = (pname,pcategory,pdate,pprize,description,instruction,idofp)
        cursor.execute(sql1,val1)
        con.commit()
        return "success" 
    
@app.route('/deletePro', methods=['GET', 'POST'])
def deletePro():
    if request.method == 'POST':
        data = request.get_json()
        
        idofp = data.get('id')  
        sql1 = 'DELETE FROM productdetails WHERE id = %s;'
        val1 = (idofp)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"
    
@app.route('/addToCart', methods=['GET', 'POST'])
def addToCart():
    if request.method == 'POST':
        data = request.get_json()
        
        idofp = data.get('id')
        uploader = data.get('uploader')
        file = data.get('file')
        name = data.get('name')
        cate = data.get('cat')
        date = data.get('date')
        prize = data.get('prize')
        quantity = data.get('quantity')
        buyer = data.get('buyer')
        
        cursor.execute('SELECT * FROM cartdata WHERE id = %s and buyer = %s', (idofp,buyer))
        count = cursor.rowcount
        if count == 1:   
            row = cursor.fetchone()
            lastquan = int(row[7])+int(quantity)
            
            sql1 = "UPDATE cartdata SET quantity = %s WHERE id = %s and buyer = %s;"
            val1 = (str(lastquan),idofp,buyer)
            cursor.execute(sql1,val1)
            con.commit()
            return "success" 
        else:
            sql1 = "INSERT INTO cartdata(id,uploader,filename,pname,pcat,pdate,pprize,quantity,buyer) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
            val1 = (idofp, uploader, file, name,cate,date,prize,quantity,buyer)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/cartProducts/<username>', methods=['GET', 'POST'])
def cartProducts(username):
    try:
        lock.acquire()
        cursor.execute('SELECT * FROM cartdata WHERE buyer = %s', (username))
        row = cursor.fetchall() 
        lock.release()
        # print(row)
        
        jsonObj = json.dumps(row)         
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/removeCart', methods=['GET', 'POST'])
def removeCart():
    if request.method == 'POST':
        data = request.get_json()
        
        idofp = data.get('id') 
        uploader = data.get('uploader') 
        buyer = data.get('buyer')  
        
        sql1 = 'DELETE FROM cartdata WHERE id = %s AND uploader = %s AND buyer = %s;'
        val1 = (idofp,uploader,buyer)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"
    
@app.route('/donePayment', methods=['GET', 'POST'])
def donePayment():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username') 
        address = data.get('address') 
        
        today = date.today()

        
        cursor.execute('SELECT * FROM cartdata WHERE buyer = %s', (username))
        row = cursor.fetchall() 
        
        for i in row:
            sql1 = "INSERT INTO payment(pid, img, title, prize,quantity,date,buyer,shipaddress) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
            val1 = (i[0], i[2], i[3], i[6], i[7], str(today), username,address)
            cursor.execute(sql1,val1)
            con.commit()
        
        for i in row:
            sql1 = 'DELETE FROM cartdata WHERE id = %s AND uploader = %s AND buyer = %s;'
            val1 = (i[0],i[1],i[8])
            cursor.execute(sql1,val1)
            con.commit()
        
        return "success"

@app.route('/updateOrderStatus', methods=['GET', 'POST'])
def updateOrderStatus():
    if request.method == 'POST':
        print("POST")
        data = request.get_json()       
        
        idofp = data.get('id') 
        title = data.get('title')
        prize = data.get('prize') 
        quantity = data.get('quantity')
        buyer = data.get('buyer') 
        status = data.get('status')
                
        sql1 = "UPDATE payment SET status = %s WHERE pid = %s AND title = %s AND prize = %s AND quantity = %s AND buyer = %s;"
        val1 = (status,idofp,title,prize,quantity,buyer)
        cursor.execute(sql1,val1)
        con.commit()
        return "success" 
    
@app.route('/viewOrders/<val>', methods=['GET', 'POST'])
def viewOrders(val):
    try:   
        print(val)
        if val == 'all':            
            lock.acquire()
            cursor.execute('SELECT * FROM payment')
            row = cursor.fetchall() 
            lock.release()
        else:            
            lock.acquire()
            cursor.execute('SELECT * FROM payment WHERE buyer = %s', (val))
            row = cursor.fetchall() 
            lock.release()
            
        jsonObj = json.dumps(row)         
        return jsonObj            
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/viewUsers', methods=['GET', 'POST'])
def viewUsers():
    try:
        lock.acquire()
        cursor.execute('SELECT * FROM users')
        row = cursor.fetchall() 
        lock.release()
        # print(row)
        
        jsonObj = json.dumps(row)         
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/soilTestData', methods=['GET', 'POST'])
def soilTestData():
    try:
        lock.acquire()
        cursor.execute('SELECT * FROM soilcenter')
        row = cursor.fetchall() 
        lock.release()
        # print(row)
        
        jsonObj = json.dumps(row)         
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/updateUser', methods=['GET', 'POST'])
def updateUser():
    if request.method == 'POST':
        data = request.get_json()
        
        idofu = data.get('id')
        username = data.get('username')
        email = data.get('email')
        mobile = data.get('mobile')
        password = data.get('password')
        
        sql1 = "UPDATE users SET username = %s,email = %s,mobile = %s,password = %s WHERE id = %s;"
        val1 = (username,email,mobile,password,idofu)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"
    return "fail"

@app.route('/deleteUser', methods=['GET', 'POST'])
def deleteUser():
    if request.method == 'POST':
        data = request.get_json()
        
        idofp = data.get('id')  
        sql1 = 'DELETE FROM users WHERE id = %s;'
        val1 = (idofp)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"
    
# ----------------------------------------------------------------------------------------------------

@app.route('/knowFertilizer', methods=['GET', 'POST'])
def knowFertilizer():
    if request.method == 'POST':
        data = request.get_json()
        
        Nitrogen = data.get('Nitrogen') 
        Phosphorous = data.get('Phosphorous') 
        Pottasium = data.get('Pottasium') 
        plantname = data.get('plantname') 

        crop_name = str(plantname)
        N = int(Nitrogen)
        P = int(Phosphorous)
        K = int(Pottasium)
        # ph = float(request.form['ph'])
    
        df = pd.read_csv('Data/fertilizer.csv')
    
        nr = df[df['Crop'] == crop_name]['N'].iloc[0]
        pr = df[df['Crop'] == crop_name]['P'].iloc[0]
        kr = df[df['Crop'] == crop_name]['K'].iloc[0]
    
        n = nr - N
        p = pr - P
        k = kr - K
        temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
        max_value = temp[max(temp.keys())]
        if max_value == "N":
            if n < 0:
                key = 'NHigh'
            else:
                key = "Nlow"
        elif max_value == "P":
            if p < 0:
                key = 'PHigh'
            else:
                key = "Plow"
        else:
            if k < 0:
                key = 'KHigh'
            else:
                key = "Klow"
    
        response = Markup(str(fertilizer_dic[key]))
        
        return response
    
# ----------------------------------------------------------------------------------------------------
    
crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))

def weather_fetch(city_name):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None
    
@app.route('/knowCrop', methods=['GET', 'POST'])
def knowCrop():
    if request.method == 'POST':
        data = request.get_json()
        
        Nitrogen = data.get('Nitrogen') 
        Phosphorous = data.get('Phosphorous') 
        Pottasium = data.get('Pottasium') 
        Phlevel = data.get('Phlevel') 
        Rainfall = data.get('Rainfall') 
        Stateofc = data.get('Stateofc') 
        Cityofc = data.get('Cityofc')
        
        N = int(Nitrogen)
        P = int(Phosphorous)
        K = int(Pottasium)
        ph = float(Phlevel)
        rainfall = float(Rainfall)
        print(Stateofc)

        # state = request.form.get("stt")
        city = Cityofc

        if weather_fetch(city) != None:
            temperature, humidity = weather_fetch(city)
            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            my_prediction = crop_recommendation_model.predict(data)
            final_prediction = my_prediction[0]

            return str(final_prediction)

        else:

            return str("No prediction available !")
 
# ----------------------------------------------------------------------------------------------------
        
disease_classes = ['Apple___Apple_scab',
                   'Apple___Black_rot',
                   'Apple___Cedar_apple_rust',
                   'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew',
                   'Cherry_(including_sour)___healthy',
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                   'Corn_(maize)___Common_rust_',
                   'Corn_(maize)___Northern_Leaf_Blight',
                   'Corn_(maize)___healthy',
                   'Grape___Black_rot',
                   'Grape___Esca_(Black_Measles)',
                   'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                   'Grape___healthy',
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot',
                   'Peach___healthy',
                   'Pepper,_bell___Bacterial_spot',
                   'Pepper,_bell___healthy',
                   'Potato___Early_blight',
                   'Potato___Late_blight',
                   'Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch',
                   'Strawberry___healthy',
                   'Tomato___Bacterial_spot',
                   'Tomato___Early_blight',
                   'Tomato___Late_blight',
                   'Tomato___Leaf_Mold',
                   'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite',
                   'Tomato___Target_Spot',
                   'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                   'Tomato___Tomato_mosaic_virus',
                   'Tomato___healthy']

disease_model_path = 'models/plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(
    disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()

def predict_image(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label
    :params: image
    :return: prediction (string)
    """
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    # Get predictions from model
    yb = model(img_u)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    # Retrieve the class label
    return prediction

@app.route('/knowDisease', methods=['GET', 'POST'])
def knowDisease():
    if request.method == 'POST':
        file = request.files["File"]   
        # print(file)
        if not file:
            return "Not detected"
        try:
            img = file.read()  
            # print(img)

            prediction = predict_image(img)

            prediction = Markup(str(disease_dic[prediction]))
            return str(prediction)
        except:
            return "Not detected"
    return ""

@app.route('/getGraphData', methods=['GET', 'POST'])
def getGraphData():
    try:             
        lock.acquire()
        cursor.execute('SELECT * FROM payment')
        row = cursor.fetchall() 
        lock.release()
        
        lock.acquire()
        cursor.execute('SELECT * FROM users')
        row1 = cursor.fetchall() 
        lock.release()
        
        ordercount=0
        salescount=0
        
        quantilst=[]
        datelst = []
        
        for i in row:
            ordercount+=int(i[4])
            salescount+=int(i[3])
            if i[5] not in datelst:
                datelst.append(i[5])
                quantilst.append(int(i[4]))
            else:
                index = datelst.index(i[5])
                quantilst[index] = int(quantilst[index])+int(i[4])
                
        print("----------------------------------")
        print(ordercount)
        print(salescount)
        print(datelst)
        print(quantilst)
        print(len(row1))
        print("----------------------------------")
        
        finallst = [ordercount,salescount,datelst,quantilst,len(row1)]
            
        jsonObj = json.dumps(finallst)  
        print(jsonObj)
        return jsonObj            
    except Exception as ex:
        print(ex)                 
        return ""
    
if __name__ == "__main__":
    app.run("0.0.0.0")
    
    # https://codesandbox.io/s/0hkkj?file=/src/App.js
    
    # sb-bga47q25010317@personal.example.com    
    # /?DtS&M0
    
    # https://www.youtube.com/watch?v=HpwiVbrdURI
    
    
