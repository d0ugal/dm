<%inherit file="site.mako" />

<div class="prepend-top">

    % for i, post in enumerate(posts):

        <div class="span-11 append-bottom ${i%2 and 'prepend-1 last' or 'append-1'}">

            <%include file="post.mako" args="post=post, display='summary'" />

            % if bf.config.blog.disqus.enabled:
                <div class="after_post">
                    <a href="${post.permalink}#disqus_thread">Read and Post Comments</a>
                </div>
            % endif

        </div>

    % endfor
    
    <div class="pager span-24 last">
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

</div>
