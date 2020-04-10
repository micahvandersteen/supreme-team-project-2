/* sql joins to combine all data */

select * from DISTRICTS;
select * from COORDINATES;
select * from INCOME;

create table COMBINED as (
select COORDINATES.id, COORDINATES.dNAME, COORDINATES.lat, COORDINATES.lng, DISTRICTS.admtotal, DISTRICTS.generalfundexpends, DISTRICTS.perpupilexpends, DISTRICTS.avgteachersalary, DISTRICTS.readingproficiency
	from COORDINATES
	INNER JOIN DISTRICTS
	ON COORDINATES.id = DISTRICTS.id 
);

create table COMBINED_DATA as (
select * 
from INCOME
INNER JOIN COMBINED
on INCOME.censusid = COMBINED.id
);

