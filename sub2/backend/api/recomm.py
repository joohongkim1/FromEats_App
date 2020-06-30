from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
from api import models, serializers

def recommendation(user_id):

    # 배포시에는 global로 선언해야 로딩시간 안걸림
    stores = models.LifeStyle.objects.all().values()
    reviews = models.Review.objects.all().values()
    review_users = models.Review_user.objects.all().values()

    stores = pd.DataFrame(list(stores))
    reviews = pd.DataFrame(list(reviews))
    review_users = pd.DataFrame(list(review_users))

    stores.rename(columns = {'store_id' : 'store'}, inplace = True)
    reviews.rename(columns = {'user_id' : 'user'}, inplace = True)
    reviews.rename(columns = {'store_id' : 'store'}, inplace = True)
    review_users.rename(columns = {'id' : 'user'}, inplace = True)
    review_users.rename(columns = {'store_id' : 'store'}, inplace = True)


    df_user_movie_ratings = reviews.pivot(
        index="user",
        columns="store",
        values="score"
    ).fillna(0)

    matrix = df_user_movie_ratings.as_matrix()
    user_ratings_mean = np.mean(matrix, axis=1)
    matrix_user_mean = matrix - user_ratings_mean.reshape(-1,1)

    U, sigma, Vt = svds(matrix_user_mean, k=12)
    sigma = np.diag(sigma)
    svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
    df_svd_pred = pd.DataFrame(svd_user_predicted_ratings, columns = df_user_movie_ratings.columns)

    def recommend_stores(df_svd_pred, user_id, ori_stores_df, ori_ratings_df, num_recommendations=5):
        user_row_number = int(user_id) - 1
        sorted_user_predictions = df_svd_pred.iloc[user_row_number].sort_values(ascending=False)
        user_data = ori_ratings_df[ori_ratings_df.user == user_id]
        user_history = user_data.merge(ori_stores_df, left_on="store", right_on="store").sort_values(["score"], ascending=False)
        recommendations = ori_stores_df[~ori_stores_df["store"].isin(user_history["store"])]
        recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(),on="store")
        recommendations = recommendations.rename(columns={user_row_number:'Predictions'}).sort_values('Predictions', ascending = False).iloc[:num_recommendations, :]
        return user_history, recommendations

    already_rated, predictions = recommend_stores(df_svd_pred, user_id, stores, reviews, 10) # 9852번으로 됨
    recomm_list = predictions["store"].tolist()
    already_list = already_rated["store"].tolist() 
    print(predictions)
    print(predictions["lifestyle"].value_counts())
    print(already_rated["lifestyle"].value_counts())
    return recomm_list