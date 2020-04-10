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
    readingProficiency NUMERIC
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
