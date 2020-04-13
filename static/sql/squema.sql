DROP DATABASE IF EXISTS MN_ED;
CREATE DATABASE MN_ED;

/* from Dept. of Ed districtleveldata.csv */
CREATE TABLE districts (

    id INT PRIMARY KEY,
    districtName TEXT,
    ADMTotal NUMERIC,
    generalFundExpends NUMERIC,
    perPupilExpends NUMERIC,
    avgTeacherSalary INT,
    readingProficiency NUMERIC,
    Total_Enroll NUMERIC,
    Female_Pct NUMERIC,
    Male_Pct NUMERIC,
    AIAN_Pct NUMERIC,
    Asian_Pct NUMERIC,
    NHPI_Pct NUMERIC,
    HisLa_Pct NUMERIC,
    Black_Pct NUMERIC,
    White_Pct NUMERIC,
    TwoMo_Pct NUMERIC,
    Meals_Pct NUMERIC
);

/* from districts.geojson */
CREATE TABLE coordinates (
    geoid INT PRIMARY KEY,
    dName TEXT,
    lat NUMERIC,
    lng NUMERIC
);

/* from census data */
CREATE TABLE census (
    censusId INT PRIMARY KEY,
    medianHouseIncome INT,
    mHI_MarginofError INT,
    NoComp_Cnt INT,
    NoComp_Pct DEC,
    YesComp_Cnt INT,
    YesComp_Pct DEC,
    NoInternet_Cnt INT,
    NoInternet_Pct DEC,
    YesInternet_Cnt INT,
    YesInternet_Pct DEC
);

/* Insert data from CSV files */ 
/* Update file paths to location on local computer */
COPY districts
FROM 'path\...\static\data\districtleveldata.csv'
WITH (FORMAT CSV, HEADER);

COPY coordinates
FROM 'path\...\static\data\districtcoordinates.csv'
WITH (FORMAT CSV, HEADER);

COPY census
FROM 'path\...\static\data\districtdata_census.csv'
WITH (FORMAT CSV, HEADER);

