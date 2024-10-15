-- SQLite
SELECT id, user_id, timestamp, lat, long
FROM locations;

SELECT 
    users.name,locations.lat,locations.long
FROM locations,users
WHERE 
    users.id=locations.user_id
AND
    (locations.user_id, locations.timestamp) IN (
            SELECT user_id, MAX(timestamp)
            FROM locations
            WHERE timestamp > datetime('now','-10 hour')
            GROUP BY user_id);



SELECT id, username, hashed_password, salt, name
FROM users;
