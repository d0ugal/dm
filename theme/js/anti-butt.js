$(function(){


  function walk(node)
  {

    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType )
    {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while ( child )
        {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;

      case 3: // Text node
        handleText(node);
        break;
    }
  }

  function handleText(textNode){

    var v = textNode.nodeValue;

    v = v.replace(/\bMy Butt\b/g, "The Cloud");
    v = v.replace(/\bMy butt\b/g, "The cloud");
    v = v.replace(/\bmy Butt\b/g, "the Cloud");
    v = v.replace(/\bmy butt\b/g, "the cloud");

    v = v.replace(/\bButt\b/g, "Cloud");
    v = v.replace(/\bbutt\b/g, "cloud");
    v = v.replace(/\bButt\b/g, "Cloud");
    v = v.replace(/\bbutt\b/g, "cloud");

    textNode.nodeValue = v;
  }

  setTimeout(function(){

    walk(document.body);

  }, 50)


});
