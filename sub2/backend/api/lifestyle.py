
#%%
import pandas as pd
import math
import pickle

f = open("../data/detailpage.pickle", "rb") # ,"utf-8" : 배포시에는 추가 설정해야
lifestylegroup = pickle.load(f)
f.close()



lifestylegroup.rename(columns = {'store' : 'store_id'}, inplace = True)
print(lifestylegroup.columns)
print(lifestylegroup.head())
