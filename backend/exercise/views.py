from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q  # Import Q from django.db.models
from .models import Exercise

@csrf_exempt
def find_exercises(request):
    exercises = Exercise.objects.all()

    # Filtering by name, description, or uses
    search_query = request.GET.get('name', '')
    if search_query:
        exercises = exercises.filter(
            Q(name__icontains=search_query) | 
            Q(description__icontains=search_query) | 
            Q(uses__icontains=search_query)
        )

    category_filter = request.GET.get('category', '')
    if category_filter:
        exercises = exercises.filter(category=category_filter)

    # Pagination
    exercises=exercises.order_by('?')
    page_number = request.GET.get('page', 1)    
    paginator = Paginator(exercises, 6)  # Display 4 exercises per page
    page_obj = paginator.get_page(page_number)

    exercises_data = [
        {
            "name": exercise.name,
            "description": exercise.description,
            "uses": exercise.uses,
            "category": exercise.category,
            "sets": exercise.sets,
            "count": exercise.count,
            "image": exercise.image.url if exercise.image else None,
        } for exercise in page_obj
    ]

    return JsonResponse({
        "exercises": exercises_data,
        "total_pages": paginator.num_pages,
        "current_page": page_obj.number,
    })




