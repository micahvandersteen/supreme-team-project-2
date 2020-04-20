
# Import Dependencies
import os
import pandas as pd
import json
from flask import Flask, request, jsonify, render_template

datafile = "static/data/MNEducationDashboard.csv"
Data = pd.read_csv(datafile)
Data = Data.rename(columns={
    'geoid': 'GeoID',
    'orgid': 'ORGID',
    'districtname': 'District',
    'admtotal': 'ADM',
    'generalfundexpends': "GeneralFundExpend",
    'perpupilexpends': "PerPupilExpend", 
    'avgteachersalary': "AvgTeachSalary", 
    'readingproficiency': "ReadingProficiency",
    'total_enroll': "TotalEnrolled",
    'female_pct': "Female_Percent",
    'male_pct': "Male_Percent",
    'aian_pct': "AIAN_Percent",
    'asian_pct': "Asian_Percent",
    'nhpi_pct': "NHPI_Percent",
    'hisla_pct': "Hispanic_Percent",
    'black_pct': "Black_Percent",
    'white_pct': "White_Percent",
    'twomo_pct': "TwoMore_Percent",
    'meals_pct': "Meals_Percent",
    'medianhouseincome': "MedianHouseIncome",
    'mhi_marginoferror': "MHI_MarginofError",
    'nocomp_cnt': "NoComputer_Count",
    'nocomp_pct': "NoComputer_Percent",
    'yescomp_cnt': "YesComputer_Count",
    'yescomp_pct': "YesComputer_Percent",
    'nointernet_cnt': "NoInternet_Count",
    'nointernet_pct': "NoInternet_Percent",
    'yesinternet_cnt': "YesInternet_Count",
    'yesinternet_pct': "YesInternet_Percent",
    'lat': "Latitude",
    'lng': "Longitude" 
    })

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route('/')
def homepage():
    webpage = render_template("index.html")
    return webpage

@app.route('/visualizations')
def mappage():
    webpage = render_template("Visualizations.html")
    return webpage

@app.route('/api')
def apipage():
    webpage = render_template("api.html")
    return webpage

@app.route("/api/data")
def get_data():
    all_data = Data.to_dict(orient='records')
    return jsonify(all_data)

@app.route("/api/data/district=<district>")
def district_search(district):
    district = district.title()
    dsearch = Data["District"].str.startswith(district)
    dist = Data[dsearch]
    all_dist = dist.to_dict(orient='records')
    return jsonify(all_dist)

@app.route("/api/data/enrollment=<enrolled>")
def enrollment_search(enrolled):
    enroll = int(enrolled)
    esearch = Data.loc[Data["TotalEnrolled"] >= enroll]
    all_enrol = esearch.to_dict(orient='records')
    return jsonify(all_enrol)

@app.route("/api/data/reading=<readingprof>")
def reading_search(readingprof):
    perprof = int(readingprof)
    rsearch = Data.loc[Data["ReadingProficiency"] >= perprof]
    all_read = rsearch.to_dict(orient='records')
    return jsonify(all_read)

if __name__ == '__main__':
    app.run(debug=True)
