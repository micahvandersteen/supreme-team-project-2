/* sql joins to combine all data */

SELECT *
	FROM districts;

SELECT *
	FROM coordinates;

SELECT *
	FROM census;

CREATE TABLE combined AS (
SELECT a.*, b.*
	FROM districts a
	INNER JOIN census b
	ON a.id = b.censusid
);

ALTER TABLE combined
DROP COLUMN censusid;

CREATE TABLE MNEducationDashboard AS (
SELECT a.*, c.lat, c.lng
	FROM combined a
	INNER JOIN coordinates c
	ON a.id = c.geoid
);

/* Export data to CSV */
COPY MNEducationDashboard
TO 'path\...\static\data\MNEducationDashboard.csv' 
DELIMITER ',' CSV HEADER;