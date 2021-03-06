from django.shortcuts import render, reverse, redirect, get_object_or_404
from django.http import HttpResponse,  HttpResponseRedirect
from .forms import SearchForm
from .models import Page
from .search import info_source, get_word


def home_page(request):
    template_name = 'multipedia/search_page.html'

    form = SearchForm(request.POST or None)
    if form.is_valid():
        return redirect('search_result_page', word=form.cleaned_data['search'])

    context = {
        "form": form,
    }
    return render(request, template_name, context)


def random_page(request, word=" "):
    word = get_word()
    return HttpResponseRedirect(reverse('search_result_page', args=[word]))


def search_result_page(request, word):
    template_name = 'multipedia/article_page.html'

    print(word)
    info = info_source(word)

    if info["no_result"]:
        return redirect('sorry_page', word=word)

    return render(request, template_name, info)


def sorry_page(request, word=None):

    template_name = 'multipedia/sorry_page.html'

    context = {
        "word": word,
    }

    return render(request, template_name, context)


"""
def blog_detail(request, pk):
    post = Post.objects.get(pk=pk)

    form = CommentForm(request.POST or None)
    if form.is_valid():
        comment = Comment(
            author=form.cleaned_data["author"],
            body=form.cleaned_data["body"],
            post=post
        )
        comment.save()
        return redirect(request.path)

    comments = Comment.objects.filter(post=post)
    context = {
        "post": post,
        "comments": comments,
        "form": form,
    }
    return render(request, 'blog_detail.html', context)
"""
