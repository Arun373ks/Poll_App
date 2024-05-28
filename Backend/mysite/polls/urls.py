from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:pk>/vote/", views.vote, name="vote"),
    path("post_question/", views.post_question, name="post_question"),
    path("get_question/",views.get_question, name="get_question"),
    path("get_polls_by_tag/",views.get_polls_by_tag, name="get_polls_by_tag"),
    path("Update_vote/<int:question_id>",views.Update_vote,name="Update_vote"),
    path("question_id/<int:question_id>",views.question_id,name="question_id"),
    path("get_all_tags",views.get_all_tags, name="get_all_tags")

]  