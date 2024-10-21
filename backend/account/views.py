from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .forms import UserProfileForm
from .models import Account
import json

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(View):
    def post(self, request):  # Correct method signature
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            if Account.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists.'}, status=400)

            account = Account.objects.create(name=name, email=email, password=password )
            return JsonResponse({'id': account.id, 'name': account.name, 'email': account.email}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def options(self, request):  # This handles OPTIONS requests
        return JsonResponse({'status': 'ok'}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body) 
            email = data.get('email')
            password = data.get('password')

            account = Account.objects.filter(email=email).first()  # Filter by is_seller
            if account and account.password == password:  # Check the password
                response_data = {
                    'id': account.id,
                    'name': account.name,
                    'message': "Login successful"
                }
                return JsonResponse(response_data, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password.'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        except Exception as e:
            print("Error:", str(e))  # Log the error
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
    

from datetime import datetime, timedelta

@csrf_exempt
def process_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        plan = data.get('plan')
        card_number = data.get('card_number')
        cvv = data.get('cvv')
        user_id = data.get('user_id')
        
        # Validate card number and CVV (basic validation)
        if len(card_number) == 16 and len(cvv) == 3:
            plan_start_date = datetime.now().date()
            plan_end_date = plan_start_date + timedelta(days=30 if '1 Month' in plan else 180 if '6 Month' in plan else 365)
            print(plan)

            # Attempt to retrieve the Account
            try:
                account = Account.objects.get(id=user_id)  # Ensure this is correct for your context
            except Account.DoesNotExist:
                return JsonResponse({'error': 'Account matching query does not exist.'}, status=404)
            
            # Update account details
            account.plan_name = plan
            account.plan_start_date = plan_start_date
            account.plan_end_date = plan_end_date
            account.save()

            return JsonResponse({'status': 'Payment successful!'}, status=200)
        else:
            return JsonResponse({'status': 'Invalid card or CVV.'}, status=400)

    return JsonResponse({'status': 'Invalid request method'}, status=405)


from django.http import JsonResponse
from .models import Account  # Assuming you're using the Account model to check enrollment

def check_enrollment(request, user_id):
    try:
        account = Account.objects.get(id=user_id)  # Adjust based on how you're identifying the user
        enrolled = account.plan_name is not None  # Assuming there's a subscription_plan field
        return JsonResponse({'enrolled': enrolled})
    except Account.DoesNotExist:
        return JsonResponse({'enrolled': False})


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contact
import json

@csrf_exempt  # Disable CSRF for simplicity, but consider adding protection
def submit_contact(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        comment = data.get('comment')

        # Save the data to the database
        contact = Contact.objects.create(name=name, email=email, comment=comment)
        return JsonResponse({'message': 'Contact saved successfully!'}, status=201)
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def user_profile_view(request, user_id):
    try:
        user_profile = Account.objects.get(id=user_id)
        user_data = {
            'user_id': user_profile.id,
            'name': user_profile.name,
            'email': user_profile.email,
            'mobile_number': user_profile.mobile_number,
            'address': user_profile.address,
            'facebook_link': user_profile.facebook_link,
            'linkedin_link': user_profile.linkedin_link,
            'profile_image': user_profile.profile_image.url if user_profile.profile_image else None,
            'height': user_profile.height,
            'weight': user_profile.weight,
            'bmi': user_profile.bmi,
            'plan_name': user_profile.plan_name,
            'plan_start_date': user_profile.plan_start_date,
            'plan_end_date': user_profile.plan_end_date,
        }
        return JsonResponse(user_data)
    except Account.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)



@csrf_exempt
def update_user_profile(request, user_id):
    user_profile = get_object_or_404(Account, id=user_id)
    form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
    if form.is_valid():
        form.save()
        return JsonResponse({'success': True, 'message': 'Profile updated successfully'})
    else:
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)

from django.shortcuts import render,get_object_or_404

@csrf_exempt
def delete_account(request, user_id):
    if request.method == 'DELETE':
        try:
            # Use user_id instead of id
            user = get_object_or_404(Account, id=user_id)
            
            # Handle related data if necessary
            # e.g., user.profile.delete() if you have a related profile
            
            user.delete()
            return JsonResponse({'message': 'Account deleted successfully'}, status=200)
        except Exception as e:
            # Log the exception
            print(f"Error deleting account: {e}")
            return JsonResponse({'error': 'An error occurred while deleting the account'}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


