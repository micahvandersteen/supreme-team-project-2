/* sql joins to combine all data */

SELECT *
	FROM districts;

SELECT *
	FROM coordinates;

SELECT *
	FROM census;

SELECT *
	FROM districtids;

CREATE TABLE combined1 AS (
SELECT a.geoid, a.orgid, b.*
	FROM districtids a
	INNER JOIN districts b
	ON a.geoid = b.id
);

ALTER TABLE combined1
DROP COLUMN id;

CREATE TABLE combined2 AS (
SELECT c.*, d.*
	FROM combined1 c
	LEFT JOIN census d
	ON c.geoid = d.censusid
);

ALTER TABLE combined2
DROP COLUMN censusid;

CREATE TABLE mnEducationDashboard AS (
SELECT e.*, f.lat, f.lng
	FROM combined2 e
	INNER JOIN coordinates f
	ON e.geoid = f.geoid
);

ALTER TABLE mnEducationDashboard 
ADD PRIMARY KEY (geoid);

/* Export data to CSV */
COPY MNEducationDashboard
TO 'path\...\static\data\MNEducationDashboard.csv' 
DELIMITER ',' CSV HEADER;