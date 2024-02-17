import tracemalloc
import time
 
def app():
    lt = []
    for i in range(0, 100000):
        lt.append(i)
 
tracemalloc.start()
start = time.time()

app()

print("Memory usage: ", tracemalloc.get_traced_memory())
end = time.time()
tracemalloc.stop()
print("Time consumed: ", end-start, "seconds")
