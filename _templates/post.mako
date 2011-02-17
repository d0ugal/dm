<%page args="post, display='full'"/>

<div class="blog_post">

    <a name="${post.slug}"></a>

    <h2 class="blog_post_title">
        <a href="${post.permapath()}" rel="bookmark" title="Permanent Link to ${post.title}">${post.title}</a>
    </h2>

    <strong>${post.date.strftime("%B %d, %Y at %I:%M %p")}</strong><br/>

    <small>
    categories:
        <%
        category_links = []
        for category in post.categories:
            if post.draft:
                category_links.append(category.name)
            else:
                category_links.append("<a href='%s'>%s</a>" % (category.path, category.name))
        %>

        ${", ".join(category_links)}

        % if bf.config.blog.disqus.enabled:
        | <a href="${post.permalink}#disqus_thread">View Comments</a>
        % endif

    </small>

    <div class="post_prose">
        % if display == 'summary':
            ${post.summary}
        % else:
            ${self.post_prose(post)}
        % endif
    </div>

</div>


<%def name="post_prose(post)">

    ${post.content}

</%def>
