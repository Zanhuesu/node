from selenium import webdriver
# from webdriver_manager.chrome import ChromeDriverManager
# from webdriver_manager.utils import ChromeType
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.chrome.options import Options
# from seleniumwire import webdriver
from selenium.webdriver.common.proxy import Proxy, ProxyType
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.proxy import Proxy, ProxyType

import os
import csv
import json
import ijson
import mysql.connector
import time
import math
import threading
import requests
import regex as re
from datetime import datetime
from urllib.request import Request, urlopen

url_printings = "https://mtgjson.com/api/v5/AllPrintings.sql"
url_prices = "https://mtgjson.com/api/v5/AllPrices.json"

filename_printings = "AllPrintings.sql"
filename_prices = "AllPrices.json"


def downloadFile(url, file_name):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(file_name, 'wb') as f:
            chunk_num = 1
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
                chunk_num = chunk_num + 1
    print("Downloaded "+file_name+" successfully.")

def fetchAllPricesFile(url, file_name):
    while True:
        try:
            downloadFile(url, file_name)
        except Exception as e:
            print(e)
        break  # for test it download file only once
        time.sleep(432000)  # for every 5 days, download file required

def BuildDB():
    # create database mtg_db
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password=""
    )
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS mtg_db")

    # create ckd product table 
    mtg_db = mysql.connector.connect(
      host="localhost",
      user="root",
      password="",
      database="mtg_db"
    )
    mtg_cursor = mtg_db.cursor(buffered=True)
    
    # ckd_sql = '''CREATE TABLE IF NOT EXISTS product 
    # (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), edition VARCHAR(255), 
    # rarity VARCHAR(5), nm_qty VARCHAR(20), nm_price DECIMAL, ex_qty VARCHAR(20),
    # ex_price DECIMAL, vg_qty VARCHAR(20), vg_price DECIMAL, g_qty VARCHAR(20), 
    # g_price DECIMAL)'''
    # mtg_cursor.execute(ckd_sql)

    
    # Create car_make table
    scg_sql = '''CREATE TABLE IF NOT EXISTS scg_price 
    (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), edition VARCHAR(255), 
    condition_language VARCHAR(50), price VARCHAR(50), full_price VARCHAR(50), 
    qty VARCHAR(20), condition_language2 VARCHAR(50), price2 VARCHAR(50), full_price2 VARCHAR(50),
    qty2 VARCHAR(20), condition_language3 VARCHAR(50), price3 VARCHAR(50), qty3 VARCHAR(20))'''
    mtg_cursor.execute(scg_sql)

def runSQL(filename):
    print(filename)
    strBuffer = ""
    sqlQuery = ""
    count = 0
    t_count = 0
    ckd_db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="mtg_db"
    )
    ckd_cursor = ckd_db.cursor(buffered=True)

    for line in open(filename, 'r', encoding="utf8"): 
        if re.match(r'--', line):  # ignore sql comment lines
            continue
        strBuffer = strBuffer + line.replace('\n', '')
        if ';' in strBuffer:
            line_tokens = strBuffer.split(';')
            sqlQuery = line_tokens[0] + ";"
            strBuffer = ';'.join(line_tokens[1:])
            try:                     
                ckd_cursor.execute(sqlQuery, multi=False)   
                count = count + 1
                t_count = t_count + 1
                print("{0} of 1,050,000".format(t_count))
            except Exception as e:
                print(sqlQuery)
                pass
            sqlQuery = '' 
        # if ";" in strBuffer:
        #     line_tokens = strBuffer.split(";")
        #     beginpos = line_tokens[0].rfind('(')
        #     endpos = line_tokens[0].rfind(')')
        #     if beginpos <= endpos:
        #         sqlQuery = line_tokens[0] + ";"
        #         strBuffer = ';'.join(line_tokens[1:])
        #     elif line_tokens[1] != "":
        #         sqlQuery = line_tokens[0] + ";" + line_tokens[1] + ';'
        #         if (len(line_tokens) > 2):
        #             strBuffer = ';'.join(line_tokens[2:])
        #         else: 
        #             strBuffer = ""
        #     else:
        #         continue
        #     try:     
        #         # print(sqlQuery)
        #         ckd_cursor.execute(sqlQuery, multi=False)   
        #         count = count + 1
        #         t_count = t_count + 1
        #         print("{0} of 1,050,000".format(t_count))
        #     except Exception as e:
        #         print(e)
        #         print(sqlQuery)
        #         pass
        #     sqlQuery = ''
        if count > 3000:
            ckd_db.commit()
            count = 0         
    ckd_db.commit()

def scrapCKDProduct():
    product_url = 'https://www.cardkingdom.com/mtg-format/standard'
    browser = webdriver.Chrome()
   
    ckd_db = mysql.connector.connect(
      host="localhost",
      user="root",
      password="123qweasd",
      database="mtg_db"
    )
    ckd_cursor = ckd_db.cursor(buffered=True)
        
    browser.get(product_url)
    page_count = math.ceil(int(browser.find_element(By.CLASS_NAME, "resultsCount").get_attribute("innerText").split(" ")[4]) / 25)
    print("Page Count: " + str(page_count))
    product_object= {}
    for i in range(1, page_count + 1):
        browser.get(product_url + "?page=" + str(i))
        products = browser.find_elements(By.CLASS_NAME, "productItemWrapper")
        
        for product in products:
            product_object['name'] = product.find_element(By.CLASS_NAME, "productDetailTitle").get_attribute("innerText")
            product_object['edition'] = product.find_element(By.CLASS_NAME, "productDetailSet").get_attribute("innerText")[:-4]
            product_object['rarity'] = product.find_element(By.CLASS_NAME, "productDetailSet").get_attribute("innerText")[-3:][1]
            card_type = product.find_element(By.CLASS_NAME, "addToCartByType").find_elements(By.TAG_NAME, "li")

            product_object['nm_price'] = card_type[0].find_element(By.CLASS_NAME, "stylePrice").get_attribute("innerText")
            product_object['ex_price'] = card_type[0].find_element(By.CLASS_NAME, "stylePrice").get_attribute("innerText")
            product_object['vg_price'] = card_type[0].find_element(By.CLASS_NAME, "stylePrice").get_attribute("innerText")
            product_object['g_price'] = card_type[0].find_element(By.CLASS_NAME, "stylePrice").get_attribute("innerText")
            
            product_object['nm_qty'] = 0
            product_object['ex_qty'] = 0
            product_object['vg_qty'] = 0
            product_object['g_qty'] = 0
            try:
                product_object['nm_qty'] = card_type[0].find_element(By.CLASS_NAME, "styleQty").get_attribute("innerText")
            except:
                print("Out of Stock")
            try:
                product_object['ex_qty'] = card_type[1].find_element(By.CLASS_NAME, "styleQty").get_attribute("innerText")
            except:
                print("Out of Stock")
            try:
                product_object['vg_qty'] = card_type[2].find_element(By.CLASS_NAME, "styleQty").get_attribute("innerText")
            except:
                print("Out of Stock")
            try:
                product_object['g_qty'] = card_type[3].find_element(By.CLASS_NAME, "styleQty").get_attribute("innerText")
            except:
                print("Out of Stock")
            price = product.find_element(By.CLASS_NAME, "stylePrice").get_attribute("innerText")


            ckd_cursor.execute("SELECT * FROM product WHERE name = '" + product_object['name'] + "' and edition = '" + product_object['edition'] +"';")
            myresult = ckd_cursor.fetchall()
            print("Length: " + str(myresult))
            if len(myresult) == 0:
                insertCKDProduct(product_object, ckd_db, ckd_cursor)
            else:
                updateCKDProduct(product_object, ckd_db, ckd_cursor)
    
    browser.close()
    print("Get all data successfully!")

def insertCKDProduct(product_object, ckd_db, ckd_cursor):
    # Insert new product into 'product' table
    val = (product_object['name'], product_object['edition'], product_object['rarity'], product_object['nm_qty'], 
        product_object['nm_price'], product_object['ex_qty'], product_object['ex_price'], product_object['vg_qty'], 
        product_object['vg_price'], product_object['g_qty'], product_object['g_price'])


    sql = '''INSERT INTO product (name, edition, rarity, nm_qty,
    nm_price, ex_qty, ex_price, vg_qty, vg_price, g_qty, g_price)
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'''
    ckd_cursor.execute(sql, val)
    ckd_db.commit()    

def updateCKDProduct(product_object, ckd_db, ckd_cursor):
    # Insert new product into 'product' table
    val = (product_object['rarity'], product_object['nm_qty'], product_object['nm_price'], product_object['ex_qty'], 
        product_object['ex_price'], product_object['vg_qty'], product_object['vg_price'], product_object['g_qty'], 
        product_object['g_price'], product_object['name'], product_object['edition'])
    sql = '''UPDATE product SET rarity = %s, nm_qty = %s, nm_price = %s, ex_qty = %s,
    ex_price = %s, vg_qty = %s, vg_price = %s, g_qty = %s, g_price = %s
    WHERE name = %s and edition = %s;'''
    ckd_cursor.execute(sql, val)
    ckd_db.commit()    

def load_CKD_Price_Json(json_filename):
    mtg_db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="123qweasd",
        database="mtg_db"
    )
    ckd_cursor = mtg_db.cursor(buffered=True)
    ckd_sql = '''CREATE TABLE IF NOT EXISTS ckd_price 
    (id INTEGER PRIMARY KEY AUTO_INCREMENT, uuid VARCHAR(100), edition VARCHAR(255), 
    rarity VARCHAR(5), nm_qty VARCHAR(20), nm_price DECIMAL, ex_qty VARCHAR(20),
    ex_price DECIMAL, vg_qty VARCHAR(20), vg_price DECIMAL, g_qty VARCHAR(20), 
    g_price DECIMAL, currency VARCHAR(20), price_history TEXT)'''
    ckd_cursor.execute(ckd_sql)
    card = {}
    count = 0

    for prefix, the_type, value in ijson.parse(open(json_filename)):
        # print(prefix, the_type, value)
        if prefix == 'data' and the_type == 'map_key':
            if card != {}:
                price_history = {'cardkingdom': card['prices']}
                dumped_json = json.dumps(price_history)
                '''
                import json
                m = {'id': 2, 'name': 'hussain'}
                n = json.dumps(m)
                o = json.loads(n)
                print(o['id'], o['name'])
                '''
                val = (card['uuid'], card['currency'], dumped_json)
                sql = '''INSERT INTO ckd_price (uuid, currency, price_history)
                VALUES(%s, %s, %s);'''
                ckd_cursor.execute(sql, val)

            card = {}
            card['prices'] = []
            card['uuid'] = value
        if the_type == 'string' and prefix != 'meta.version' and prefix != 'meta.date':
            card['currency'] = value
        if the_type == 'number':
            if prefix.find("cardkingdom") != -1 and prefix.find("retail") != -1:
                prefix_tokens = prefix.split('.')
                token_len = len(prefix_tokens)
                card['prices'].append({prefix_tokens[token_len - 1]:str(value)})

        if count > 3000:
            mtg_db.commit()
            count = 0  
            # break
        count = count + 1
        mtg_db.commit()  


def scrapSCGProduct():
    product_url = 'https://starcitygames.com/shop/'
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    # browser = webdriver.Chrome()    # for local windows
    browser = webdriver.Chrome(ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install(), options=chrome_options)    # for ubuntu server

    scg_db = mysql.connector.connect(
      host="localhost",
      user="root",
      password="123qweasd",
      database="mtg_db"
    )
    scg_cursor = scg_db.cursor(buffered=True)
        
    browser.get(product_url)
    print("Browser get url")
    page_count = 3723
    product_object= {}
    for i in range(1, page_count):
        browser.get(product_url + "?pg=" + str(i))
        products = browser.find_elements(By.CLASS_NAME, "hawk-results-item")
        
        for product in products:
            product_object['name'] = product.find_element(By.CLASS_NAME, "hawk-results-item__title").get_attribute("innerText")
            product_object['edition'] =  product.find_element(By.CLASS_NAME, "hawk-results-item__category").get_attribute("innerText")
            
            
            table_rows =  product.find_elements(By.CLASS_NAME, "hawk-results-item__options-table-row")
            try:
                product_object['condition_language'] = table_rows[0].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--name").get_attribute("innerText")
                product_object['price'] = table_rows[0].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--price").get_attribute("innerText")
                product_object['full_price'] = ""
                product_object['qty'] = int(table_rows[0].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--qty").get_attribute("innerText").split(": ")[1])
            except:
                product_object['condition_language'] = ""
                product_object['price'] = ""
                product_object['full_price'] = ""
                product_object['qty'] = ""
            try:
                product_object['condition_language2'] = table_rows[1].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--name").get_attribute("innerText")
                product_object['price2'] = table_rows[1].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--price").get_attribute("innerText")
                product_object['full_price2'] = ""
                product_object['qty2'] = int(table_rows[1].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--qty").get_attribute("innerText").split(": ")[1])
            except:
                product_object['condition_language2'] = ""
                product_object['price2'] = ""
                product_object['full_price2'] = ""
                product_object['qty2'] = ""
            try:
                product_object['condition_language3'] = table_rows[2].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--name").get_attribute("innerText")
                product_object['price3'] = table_rows[2].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--price").get_attribute("innerText")
                product_object['qty3'] = int(table_rows[2].find_element(By.CLASS_NAME, "hawk-results-item__options-table-cell--qty").get_attribute("innerText").split(": ")[1])
            except:
                product_object['condition_language3'] = ""
                product_object['price3'] = ""
                product_object['qty3'] = ""

            try:
                scg_cursor.execute("SELECT * FROM scg_price WHERE name = `" + product_object['name'] + "` and edition = `" + product_object['edition'] +"`;")
                myresult = scg_cursor.fetchall()
                if len(myresult) == 0:
                    insertSCGProduct(product_object, scg_db, scg_cursor)
                else:
                    updateSCGProduct(product_object, scg_db, scg_cursor)
            except Exception as e:
                pass
        print("page " + str(i) + " of 3723 Scrapped")
        time.sleep(20)
    browser.close()
    print("Get all SCG data successfully!")

def insertSCGProduct(product_object, scg_db, scg_cursor):
    # Insert new product into 'product' table
    val = (product_object['name'], product_object['edition'], product_object['condition_language'], product_object['price'], 
        product_object['full_price'], product_object['qty'], product_object['condition_language2'], product_object['price2'], 
        product_object['full_price2'], product_object['qty2'], product_object['condition_language3'], product_object['price3'], product_object['qty3'])


    sql = '''INSERT INTO scg_price (name, edition, condition_language, price,
    full_price, qty, condition_language2, price2, full_price2,
    qty2, condition_language3, price3, qty3)
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'''
    scg_cursor.execute(sql, val)
    scg_db.commit()

def updateSCGProduct(product_object, scg_db, scg_cursor):
    # Insert new product into 'product' table
    val = (product_object['condition_language'], product_object['price'], product_object['full_price'], product_object['qty'], 
        product_object['condition_language2'], product_object['price2'], product_object['full_price2'], product_object['qty2'], 
        product_object['condition_language3'], product_object['price3'], product_object['qty3'], product_object['name'], 
        product_object['edition'])
    sql = '''UPDATE scg_price SET condition_language = %s, price = %s,
    full_price = %s, qty = %s, condition_language2 = %s, price2 = %s, full_price2 = %s,
    qty2 = %s, condition_language3 = %s, price3 = %s, qty3 = %s
    WHERE name = %s and edition = %s;'''
    scg_cursor.execute(sql, val)
    scg_db.commit()


if __name__ == "__main__":
    BuildDB()
    # scrapCKDProduct()  # used for scrap CKD product
    # scrapSCGProduct()
    runSQL(filename_printings)

    # # Create new thread to download AllPrintings.sql file
    # downloadPrintingsThread = threading.Thread(target = downloadFile, args = (url_printings, filename_printings,))
    # downloadPrintingsThread.start()

    # # Create new thread to download AllPrices.json file
    # downloadPricesThread = threading.Thread(target = fetchAllPricesFile, args = (url_prices, filename_prices,))
    # downloadPricesThread.start()

    # # Create new thread to scrap SCG products
    # scrapSCGThread = threading.Thread(target = scrapSCGProduct)
    # scrapSCGThread.start()

    # # Create new thread to load CKD printings from sql file
    # loadCKDPrintingsThread = threading.Thread(target = runSQL, args = (filename_printings,))
    # loadCKDPrintingsThread.start()

    # # Create new thread to load CKD prices from json file
    # loadCKDPricesThread = threading.Thread(target = load_CKD_Price_Json, args = (filename_prices, ))
    # loadCKDPricesThread.start()
    print("hello")
