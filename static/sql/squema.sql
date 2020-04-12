DROP DATABASE MN_ED;
CREATE DATABASE MN_ED;

/* from Dept. of Ed districtleveldata.csv */
CREATE TABLE DISTRICTS (

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
CREATE TABLE COORDINATES (
    id INT PRIMARY KEY,
    dName TEXT,
    lat NUMERIC,
    lng NUMERIC
);

/* from census data */
CREATE TABLE INCOME (
    censusid INT PRIMARY KEY,
    popCount INT,
    mHI INT
    
);

