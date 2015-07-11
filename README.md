## CSS-FINDER : Reuse your existing CSS classes efficiently and smartly
While making HTML pages in a project on which more than one developers are working, most of the times we add inline-styles to the HTML tags OR make a new CSS class without even knowing that there already could exist either a single CSS class OR a bunch of CSS classes in some external css file developed by our co-developer, which we could've used instead of writing our own css. Now a question comes why are we worried about inline CSS or redundant CSS classes, A simple answer could be Inline CSS are difficult to maintain and looks ugly in HTML code and redundant CSS classes makes the css-file bulky thus puts a obstacle in site's performance. So, the problem now is :=> how would a developer know that hey! these are the CSS classes that you can use instead of writing your own stuff.
    One of the solution to solve the above problem is to search for such CSS classes MANUALLY in all the css-files, which obviously would take much-much time and thus is not a feasilble solution. And this gives rise to Solution-2 which will be an application which will do this for us. The application will first load all of the css-files of the project in its memory, and then it will prompt the user (The HTML Developer) to enter the set of css-properties he wants to use, and then it will show the result i.e. the list of CSS classes or class which he can use instead of writing his own CSS code. OR if the search result has nothing to show, then it means a green signal to user to add a new CSS class in the css-file.

*An example to illustrate the idea:=>* Lets use numerals to show css properties, suppose the application has the following css classes in its memory, loaded via external css-files : 
.a{2,3} , .b{1} , .c{2} , .d{1, 2}, .e{3}, .f {2,5}
where . (dot) is a class selector, [a,b,c..etc] are names of our CSS claseses and [1,2,3 etc] are name of CSS properties.

1. And if a user queries like this :=> 1,2
Application-Answer :=>  .d{1,2}

2. User Query:=> 1,2,3
Application-Answer:=>  .a{2,3} , .b{1}   OR  .d{1, 2}, .e{3} 

3. User Query:=>2,4
Application-Answer:=> your request can be partially fulfilled with class .c{2} , and you have to make a new class for your remaining properties [4]

4. User Query:=> 5
Application-Answer:=> No classes found, make a new one
Reason:Since 5 is not present as an independent class in system

You must be thinking that [.b{1}, .c{2}] can also be a possible solution to query-1 and [.b{1}, .c{2}, .e{3}] can also be a possible solution to query-2, but the twist here is the *minimum number of CSS classes to fulfill a given requirement of CSS properties*. 

We can even show a list of possible solutions to the user in increasing order of the number of CSS classes used to fulfill his requirement.
