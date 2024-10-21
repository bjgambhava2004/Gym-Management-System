from django.urls import path
from .views import SignupView,LoginView,process_payment
from . import views
from .views import submit_contact
urlpatterns = [
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/process_payment/', views.process_payment, name='process-payment'),
    path('api/check_enrollment/<str:user_id>/', views.check_enrollment, name='check_enrollment'),
    path('api/submit-contact/', submit_contact, name='submit-contact'),
    path('api/user-profile/<int:user_id>/', views.user_profile_view, name='user-profile'),
    path('api/delete-account/<int:user_id>/', views.delete_account, name='delete-account'),
    path('api/user-profile-update/<int:user_id>/',views.update_user_profile, name='user-profile-update')
    # Other paths...
]
