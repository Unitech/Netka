import redis

r = redis.Redis()
r.publish('test', 'tot') 
