<%inherit file="site.mako" />

<div class="prepend-top">

    % for i, post in enumerate(posts):

        <div class="span-11 ${i%2 and 'prepend-2 last' or ''}">

            <%include file="post.mako" args="post=post" />

            % if bf.config.blog.disqus.enabled:
                <div class="after_post">
                    <a href="${post.permalink}#disqus_thread">Read and Post Comments</a>
                </div>
            % endif

            <hr class="interblog" />

        </div>

    % endfor

    % if prev_link:
        <a href="${prev_link}">« Previous Page</a>
    % endif

    % if prev_link and next_link:
        --
    % endif

    % if next_link:
        <a href="${next_link}">Next Page »</a>
    % endif

</div>
