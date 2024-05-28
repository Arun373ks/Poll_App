from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.db.models import F
from django.views.decorators.csrf import csrf_exempt

from .models import Choice, Question, Tag
from django.http import JsonResponse
import json
from django.utils import timezone
from django.db import models



class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"


class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "polls/detail.html",
            {
                "question": question,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        selected_choice.votes = F("votes") + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
@csrf_exempt    
def post_question(request):
    if request.method == 'POST':
           data = json.loads(request.body)
           question_text =data['Question']
           options = data.get('OptionVote',{})
           tags = data.get('Tags',[])
           question = Question.objects.create(question_text=question_text, pub_date=timezone.now())

           for option, votes in options.items():
               option = Choice.objects.create(question=question, choice_text=option, votes=int(votes))

           for tag in tags:
              tag = Tag.objects.create(question=question, name=tag)
             
           return JsonResponse({'message': 'Question posted successfully'}, status=201) 

    else:
        return JsonResponse({'error': 'Method not allowed'})
   
 

def get_question(request):
    questions = Question.objects.all()
    data = []
    for question in questions:
        options = {}
        for choice in question.choice_set.all():
            options[choice.choice_text] =  choice.votes 

        tags = [tag.name for tag in question.question_tags.all()]    
        
        question_data = {
            "Question": question.question_text,
            "OptionVote": options,
            "QuestionID": question.id,
            "Tags": tags
        }
        data.append(question_data)
    return JsonResponse(data, safe=False)
 
def get_polls_by_tag(request):
    tag_names = request.GET.getlist('tag')
    print(tag_names)
    tag_names_str = ','.join(tag_names)
    tag_names = tag_names_str.split(',')
    tag_names = [tag.strip() for tag in tag_names]
    questions = Question.objects.filter(question_tags__name__in= tag_names).distinct() 
    
    print(questions)
    data = []
    
    for question in questions:
       options = {}
       for choice in question.choice_set.all():
            options[choice.choice_text] =  choice.votes 

       tags = [tag.name for tag in question.question_tags.all()]    
        
       question_data = {
            "Question": question.question_text,
            "OptionVote": options,
            "QuestionID": question.id,
            "Tags": tags
        }
       data.append(question_data)
       print(data)
    
    return JsonResponse(data, safe=False)


@csrf_exempt
def Update_vote(request, question_id):
    if request.method == 'PUT':
        try:
            payload = json.loads(request.body)
            choice_text = payload.get('incrementoption')

            if not choice_text:
                return JsonResponse({'error': 'Choice text is required in the payload'}, status=400)

            question = Question.objects.get(pk=question_id)
            # choice = Choice.objects.get(choice_text=choice_text)
            choice = question.choice_set.get(choice_text=choice_text)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
        except Question.DoesNotExist:
            return JsonResponse({'error': 'Question does not exist'}, status=404)
        except Choice.DoesNotExist:
            return JsonResponse({'error': 'Choice does not exist'}, status=404)

        choice.votes += 1
        choice.save()

        return JsonResponse({'message': 'Vote increased successfully'})

    else:
        return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)

def question_id(request, question_id ):
    if request.method == 'GET':
        # question_id = request.GET.getlist('question_id')
        # print(question_id)
        # if not question_id:
        #    return JsonResponse({'error': 'Question ID is required in the payload '}, status=400 )
        
        try:
            question = Question.objects.get(pk=question_id)
            print(question) 
        except Question.DoesNotExist:
            return JsonResponse({'error':'Question does not exist'},status=404)   
        
        OptionVotes={}
        for choice in question.choice_set.all():
            OptionVotes[choice.choice_text] =  choice.votes
           

        tags = [tag.name for tag in question.question_tags.all()]

        response_data = {
            'question_text': question.question_text,
            'OptionVotes' : OptionVotes,
            'Question_ID' :question_id,
            'tags': tags
        }

        return JsonResponse(response_data)
    
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    
def get_all_tags(request):
    tags = Tag.objects.all().values_list('name', flat=True).distinct()
    tag_list = list(tags)
    response_data = {
        "Tags":tag_list
    }
    return JsonResponse(response_data)

    

