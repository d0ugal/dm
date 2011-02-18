<%inherit file="_templates/site.mako" />

<div class="span-22 prepend-top">

    <div class="span-21 box">

        <h3>Curriculum Vitae</h3>
        <p>
            Thanks for showing an interest in my CV. You can download it in
            a few different formats or view it below. If you have any
            questions or need a different format, please <a href="/about/">
            get in touch</a>.
        </p>


        <div class="dllink span-7">
            <a href="./dougalmatthews.pdf">Download as .pdf</a>
        </div>

        <div class="dllink span-7">
            <a target="_blank" href="./dougalmatthews.html">View as html</a>
        </div>

        <div class="dllink span-7 last">
            <a target="_blank" href="./dougalmatthews.doc">Download as .doc</a>
        </div>

        <div class="clear"></div>

    </div>

    <div id="cv">

        ${cv}

    </div>

</div>

