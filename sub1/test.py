from datetime import datetime as dt

now = dt.now()
year = now.strftime('%Y')
year = int(year)

print(type(year))
