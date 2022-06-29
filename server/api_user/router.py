from user.viewsets import UserViewset
from user.viewsets import SaveViewset
from rest_framework import routers


router = routers.DefaultRouter()
router.register('user',UserViewset)
router.register('save',SaveViewset)



#localhost/api/
#GPUD
#functions: list->/user ,retrive->/user/id