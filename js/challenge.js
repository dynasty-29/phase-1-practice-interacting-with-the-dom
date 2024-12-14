// As a user, I can:
//     See the timer increment every second once the page has loaded.
//     Manually increment and decrement the counter using the plus and minus buttons.
//     "Like" an individual number of the counter. 
// I should see the count of the number of "likes" associated with that number displayed.
//     Pause the counter, which should:
//     pause the counter
//     disable all buttons except the pause button
//     switch the label on the button from "pause" to "resume"
//     Click the "resume" button to restart the counter and re-enable the buttons.
//     Leave comments on my gameplay, such as: "Wow, what a fun game this is."

//Fisrt i will get all the DOM elements and storing under a variabe to use later in my functions
const allcounter = document.getElementById('counter');
const allminus =document.getElementById('minus');
const allplus =document.getElementById('plus');
const allheart =document.getElementById('heart');
const allpause =document.getElementById('pause');
const allist =document.getElementById('list');
const allform =document.getElementById('comment-form');
const allinput =document.getElementById('comment-input');
const allikes =document.querySelector('.likes');

//the timer increment is after every second so will start it at 0
let counterValue = 0;
//will also start with assumption that pause is not activate so its false
let isPause = false;

//so lets now create a function that will use to set timer increment of
//  1 sec to increase our counter on load until paused
function increaseTime()
{
    //condition is the pause is not activated by user
    if(!isPause)
    {
        //it increases the counter value with every sec
        counterValue++;

        //will now use this to increase to the counter element in out html we saved
        allcounter.innerText = counterValue;
    }

}
//oops not working
//so let me activate the timer using this function and setInteval method
let timer = setInterval(increaseTime, 1000);

// Awesome timer start on page load
//now we want to add the manual increament of plus and minus
//here we utilise event listeners to our html elements we stored above

//lets start with element that manually activates minus button when clicked
allminus.addEventListener('click', ()=>
    {
        //here will still assuming pause is not activated as we did before
        if(!isPause)
        {
            //it decrease the counter value with every sec, its minus after all
            counterValue--;
    
            //will now use this to decrese to the counter element in 
            // out html we saved
            allcounter.innerText = counterValue;
        }
    }
) 

//to have same effect on plus button will just replicate the same code but increase
allplus.addEventListener('click', ()=>
    {
        //here will still assuming pause is not activated as we did before
        if(!isPause)
        {
            counterValue++;
            allcounter.innerText = counterValue;
        }
    }
) 
//Awesome it works let move on
//now we need the heart (like) to work 
//before we need to store all number of likes in variable
let isLiked = {};
allheart.addEventListener('click', ()=>
    {
        // will look in a situation where its actually a like
        //will utilise some part of code above
        //first will assume pause is not activated
        if(!isPause)
        {
            //here we do something different
            //it says I should see the count of the number of "likes" associated with that number displayed.
            //so we do a condition that checks if counter number has been liked
            if(isLiked[counterValue])
            {
                //if this is true, we increase its count
                isLiked[counterValue]++;
            }
            //if not
            else
            {
                //we initiate its count
                isLiked[counterValue] = 1;
            }

            //in a state that its a dislikes how do we handle this
            let likesListItem = document.querySelector(`li[data-number='${counterValue}']`);
            if (!likesListItem) 
            {
                likesListItem = document.createElement('li');
                likesListItem.setAttribute('data-number', counterValue);
                allikes.appendChild(likesListItem);
            }
            likesListItem.innerText = `Number ${counterValue} has been liked ${isLiked[counterValue]} time(s).`;
        }
    }
)

//now we need our pause button working, we just add listener like we did other button and set the condition
// Handling Pause/Resume Button
allpause.addEventListener('click', () => 
    {
        //as usual we assume pause is not activated, well we dont' have a function for it so far
        if (!isPause) 
        {
            // this should pause the counter
            //so on pause it clears the timer
            clearInterval(timer);
            //the html element is updated to Resume, incase user want to resume
            allpause.innerText = 'Resume';
            //is puase now changes from false to true
            isPause = true;
            //we make sure all other buttons are disabled so have this function 
            //will write its usability after this
            disableButtons(true);
            allpause.disabled = false;
        } 
        //awesome it works but now we want to activate the resume 

        else 
        {
            //this will resume the counter
            timer = setInterval(increaseTime, 1000);
            //inner html changes to pause to diplay pause incase user want to pause again
            allpause.innerText = 'Pause';
            //the pause returns to false
            isPause = false;
            //buttons are no longer disbled and can work now
            disableButtons(false);
            allpause.disabled = false;
      
        }
    }
);

///upto this point after user pauses they are now able to resume dipite having the resume solved
//this is because we have a function we havn't implemented ,
//the disableButtons above, lets input its functionality
// Function to enable/disable buttons
function disableButtons(disable) 
{
    //disables all buttons
    //has to be activated in function above
    allminus.disabled = disable;
    allplus.disabled = disable;
    allheart.disabled = disable;
}

///now we want to handle all comments in the form element
// we add a listener on submit button whenever clicked
allform.addEventListener('submit', (event) => 
    {
        //first we want to prevent form behavior
        event.preventDefault();
        //we want to store inputs inthe form in a varible
        const newComment = allinput.value;
        //now we create a condition that check there is an actual value keyed by the user
        if (newComment) 
        {
            //we want to store all these comments in p elements wwhen present
            // so we create the p element in out html
            const commentElement = document.createElement('p');
            //we populate the p with these comments using the variable we stored them in
            commentElement.innerText = newComment;
            allist.appendChild(commentElement);
            //once stored we clear input field and await for more input
            allinput.value = ''; 
        }
    }
);