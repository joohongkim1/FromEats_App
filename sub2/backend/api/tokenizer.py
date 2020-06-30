import pandas as pd
from  konlpy.tag import Okt # 스칼라로 작성된 한글 토크나이저 오픈 소스
import math
import pickle
import gensim
from gensim import corpora


f = open("../data/tokendata4.pickle", "rb","utf-8")
tokendata = pickle.load(f)
f.close()

def make_topictable_per_doc(ldamodel, corpus, texts):
    topic_table = pd.DataFrame()

    # 몇 번째 문서인지를 의미하는 문서 번호와 해당 문서의 토픽 비중을 한 줄씩 꺼내온다.
    for i, topic_list in enumerate(ldamodel[corpus]):
        doc = topic_list[0] if ldamodel.per_word_topics else topic_list            
        doc = sorted(doc, key=lambda x: (x[1]), reverse=True)
        for j, (topic_num, prop_topic) in enumerate(doc): 
            if j == 0:  
                topic_table = topic_table.append(pd.Series([int(topic_num), round(prop_topic,4), topic_list]), ignore_index=True)
            else:
                break
    return(topic_table)



#print(tokendata)
tokendata.reset_index(drop=False,inplace=True)
#print(tokendata["content"])
tokenized_doc = tokendata["content"]


dictionary = corpora.Dictionary(tokenized_doc) # 정수 인코딩 수행해보기
corpus = [dictionary.doc2bow(text) for text in tokenized_doc]
print(corpus[1]) # 수행된 결과에서 두번째 뉴스 출력. 첫번째 문서의 인덱스는 0

NUM_TOPICS = 20 #7개의 토픽, k=7
ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics = NUM_TOPICS, id2word=dictionary, passes=15) # 15회 수행 - 임의적
# 각 토픽의 키워드와 키워드 가중치 볼 수 있음
topics = ldamodel.print_topics(num_words=6) 
print(topics)

topictable = make_topictable_per_doc(ldamodel, corpus, tokenized_doc)
topictable = topictable.reset_index() # 문서 번호을 의미하는 열(column)로 사용하기 위해서 인덱스 열을 하나 더 만든다.
topictable.columns = ['문서 번호', '가장 비중이 높은 토픽', '가장 높은 토픽의 비중', '각 토픽의 비중']
print(topictable[:10])


with open('../data/ouput6.pickle', 'wb',"utf-8") as f:
    pickle.dump(topictable, f, pickle.HIGHEST_PROTOCOL)

# load
with open('../data/ouput6.pickle', 'rb',"utf-8") as f:
    topictable = pickle.load(f)



