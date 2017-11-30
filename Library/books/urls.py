"""Library URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from .views import BookDetailsAPIView,BookCreateAPIView,BookListAPIView,BookTagListView


urlpatterns = [
    url(r'^$',BookListAPIView.as_view(),name='list'),
    url(r'^create',BookCreateAPIView.as_view()),
    url(r'^(?P<pk>\d+)/$',BookDetailsAPIView.as_view(),name='bookdetails'),
    url(r'^(?P<query>[\w-]+)$',BookListAPIView.as_view(),name='list'),
    url(r'^tags/$',BookTagListView.as_view(),name='tagbooks'),
    url(r'^tags/(?P<query>[\w-]+)',BookTagListView.as_view(),name='tagbooks')

]
