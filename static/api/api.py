
# Import Dependencies
import os
import pandas as pd
import json
from flask import Flask, request, jsonify, render_template

datafile = "data/MNEducationDashboard.csv"
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
    """List all available routes"""
    return (
        f"<h2>Welcome to the Minnesota Education Dashboard API</h2>"
        f"<em>A supreme-team production (2020)</em><br/><br/>"

        f"<h4>Available Routes:</h4>"

        f"/data<br/>"
        f"Returns all districts<br/><br/>"

        f"/data/districts=district<br/>"
        f"Returns data for specified district. Searchs for all districts that start with your search term.<br/><br/>"

        f"/data/enrollment=0000<br/>"
        f"Returns data for districts with enrollment equal to or greater than your search.<br/><br/>"

        f"/data/reading=00.00<br/>"
        f"Returns data for districts with reading proficiency equal to or greater than your search."
    )

@app.route("/data")
def get_data():
    all_data = Data.to_dict(orient='records')
    return jsonify(all_data)

@app.route("/data/district=<district>")
def district_search(district):
    district = district.title()
    dsearch = Data["District"].str.startswith(district)
    dist = Data[dsearch]
    all_dist = dist.to_dict(orient='records')
    return jsonify(all_dist)

@app.route("/data/enrollment=<enrolled>")
def enrollment_search(enrolled):
    enroll = int(enrolled)
    esearch = Data.loc[Data["TotalEnrolled"] >= enroll]
    all_enrol = esearch.to_dict(orient='records')
    return jsonify(all_enrol)

@app.route("/data/reading=<readingprof>")
def reading_search(readingprof):
    perprof = int(readingprof)
    rsearch = Data.loc[Data["ReadingProficiency"] >= perprof]
    all_read = rsearch.to_dict(orient='records')
    return jsonify(all_read)

if __name__ == '__main__':
    app.run(debug=True)
