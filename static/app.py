import os

from sqlalchemy import create_engine, MetaData, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from flask import Flask, request, jsonify, render_template

import psycopg2

from decimal import Decimal

from db_config import hostname, portno, username, password

connection = psycopg2.connect(
    user=username,
    password=password,
    host=hostname,
    port=portno,
    database="MN_ED"
)
cursor = connection.cursor()

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route('/')
def homepage():
    return render_template("api.html")

@app.route("/api/v1.0/data")
def get_data():
    s = "SELECT * FROM mneducationdashboard"
    cursor.execute(s)
    results = cursor.fetchall()
    rows = [tuple(str(item) for item in t) for t in results]
    all_data = []
    for row in rows:
        data_dict = {}
        data_dict["GeoID"] = row[0]
        data_dict["ORGID"] = row[1]
        data_dict["District"] = row[2]
        data_dict["ADM"] = row[3]
        data_dict["GeneralFundExpend"] = row[4]
        data_dict["PerPupilExpend"] = row[5]
        data_dict["AvgTeachSalary"] = row[6]
        data_dict["ReadingProficiency"] = row[7]
        data_dict["TotalEnrolled"] = row[8]
        data_dict["Female_Percent"] = row[9]
        data_dict["Male_Percent"] = row[10]
        data_dict["AIAN_Percent"] = row[11]
        data_dict["Asian_Percent"] = row[12]
        data_dict["NHPI_Percent"] = row[13]
        data_dict["Hispanic_Percent"] = row[14]
        data_dict["Black_Percent"] = row[15]
        data_dict["White_Percent"] = row[16]
        data_dict["TwoMore_Percent"] = row[17]
        data_dict["Meals_Percent"] = row[18]
        data_dict["MedianHouseIncome"] = row[19]
        data_dict["MHI_MarginofError"] = row[20]
        data_dict["NoComputer_Count"] = row[21]
        data_dict["NoComputer_Percent"] = row[22]
        data_dict["YesComputer_Count"] = row[23]
        data_dict["YesComputer_Percent"] = row[24]
        data_dict["NoInternet_Count"] = row[25]
        data_dict["NoInternet_Percent"] = row[26]
        data_dict["YesInternet_Count"] = row[27]
        data_dict["YesInternet_Percent"] = row[28]
        data_dict["Latitude"] = row[29]
        data_dict["Longitude"] = row[30]
        all_data.append(data_dict)
    return jsonify(all_data)

if __name__ == '__main__':
    app.run(debug=True)
