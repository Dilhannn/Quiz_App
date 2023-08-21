const { openBrowser, closeBrowser, goto, write, click, waitFor, text, into, checkBox, button } = require('taiko');

(async () => {
  try {
    await openBrowser();
    await goto('http://localhost:3000/');
    await waitFor(500); 

    await write('John', into('First Name'));
    await write('johndoe@example.com', into('Email Address'));
    await write('password123', into('Password'));

    await click('Sign Up'); 
    await waitFor(500);

    await text('Sign in').exists(); 

    await goto('http://localhost:3000/login'); 
    await waitFor(500);

    await write('johndoe@example.com', into('Email Address')); 
    await write('password123', into('Password')); 

    await click('Sign In'); 
    await waitFor(500);

    await goto('http://localhost:3000/main'); 
    await waitFor(500); 

    await text('Welcome to the Main Page').exists(); 

    await goto('http://localhost:3000/10'); 
    await waitFor(500); 

    await text('Category Questions').exists(); 

    await checkBox({ id: 'checkbox' }).check();

    await click(button({ id: 'whatNext' }));
    await waitFor(500);
    for (let i = 0; i < 8; i++) {
      await checkBox({ id: 'checkbox' }).check();
      await click(button({ id: 'whatNext' }));
      await waitFor(500);
    }

    await checkBox({ id: 'checkbox' }).check();

    await click(button({ id: 'finishExam' }));
    } catch (error) {
    console.error('Test failed:', error);
    } finally {
    await closeBrowser();
    }
    })();
    

