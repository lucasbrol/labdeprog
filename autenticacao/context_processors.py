

def user_context(request):

    return {
        'user_email': request.session.get('user'),
    }
