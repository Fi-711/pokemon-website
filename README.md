# Pokémon Cards Shop

![image info](./src/assets/haunter.png)

## Created with React, Chakra-UI, SCSS, Flask and MySQL

http://pokemon-cards-shop.apps.cs.cf.ac.uk/

## Installation - Windows

**You will need to know the environment variables - stored in a .flaskenv file, not on gitlab. One should be in the submission pack for Learning Central**

Modify package.json so proxy points to your server e.g. for local host it would be: 127.0.0.1:5000 for a flask server

Create a python 3.6 virtual environment in the root with the following command:

`py -3.6 -m venv venv`

Activate the virtual environment:

`venv\Scripts\activate`

Install python dependencies

`pip install -r requirements.txt`

Install node modules with npm

`npm install`

Run flask server

`flask run`

Run react

`npm start`

Website should be available on 127.0.0.1:3000

## References

Where **code** is directly used, references are also inserted at the relevant sections to give the author their credit.

### CSS

- Pokeball Loader CSS - Codepen user: Vincenzo Bianco: https://codepen.io/vinztt/pen/XjEyvk
- Neon Glow CSS - Codepen user Felix Rilling: https://codepen.io/FelixRilling/pen/qzfoc
- Card Flipping - https://www.w3schools.com/howto/howto_css_flip_card.asp
- Image Shake - https://www.w3schools.com/howto/howto_css_shake_image.asp

### Javascript

- Scroll to top - Modified code from: https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
- Glitch Effect on Home Page: Codepen user Gage Henderson: https://codepen.io/callgage/pen/RxQqGr

### Art Assets

Haunter image: https://www.pngjoy.com/preview/a5l8m3r4r5c6b7_gastly-pokemon-haunter-fan-art-hd-png-download/

Element Icons: https://pokemontcg.guru/

Pokemon Logo and Art: Official Website: https://www.pokemon.com/us/copyright/.

All Artworks belonging to the Pokemon company are used under fair usage copyright law. All images belong to the Pokemon Company and are solely used by this website for educational purposes.

Pokemon Cards and Data: Pokemon TCG API - https://pokemontcg.io/

### Fonts

Google Fonts: https://fonts.google.com/

- **Fonts**: Open Sans Condensed, Roboto, Architects Daughter, Lexend

### Styling

Chakra UI Docs: https://chakra-ui.com/docs

## Modules Used

### Flask

- **Flask**: Back end server
- **Flask-Mail**: Send email confirmations to users
- **gunicorn**: To deploy project on openshift
- **python-dotenv**: To load environment variables from a file
- **SQLAlchemy**: ORM module to communicate with MySQL db
- **flask-praetorian**: Authorisation using JW tokens. Code modified from provided example docs: https://flask-praetorian.readthedocs.io/en/latest/quickstart.html#example
- **flask-marhsmallow**: Jsonifies data from SQLAlchemy tables using 'schemas'.
- **simplejson**: Flask built in json does not read decimals
- **pokemontcgsdk**: Queries the pokemontcg api (https://pokemontcg.io/) and pulls back data to be pushed to my db. This script is not necessary for deployment but included to show work done.
- **stripe**: To allow backend payment processing

### React

- **react-redux**: manage state in a central store.
- **react-router-dom**: manage front end routes
- **axios**: all fetch requests done through axios - safer, faster, jsonifies data and easy to add parameters/ headers.
- **stripe and stripe-elements**: required to integrate stripe payments.
- **redux-logger**: middleware to debug redux when in development mode
- **redux-persist**: stores redux data in local storage
- **redux-thunk**: helps handle asynchronous requests
- **chakra-ui/react**: styling ui framework mainly used for grids and mobile responsiveness
- **chakra-ui/themes**: extend default chakra theme for bespoke finish
- **material-ui**: rating system - initially used material ui but replaced everything with Chakra UI except this rating panel
- **react-icons**: extra ui icons e.g. delete and edit icons
- **reselect**: helps deconstruct methods when using redux
- **uuid**: generates unique id's - needed for some prop keys
- **node-sass**: helps implement sass css files into react components
- **react-pdf**: generate pdf shipping labels

## Extra Features in MarkScheme

- **Search Function**: On card each card set, next to sort function, can search by name with instant feedback. Throttled response time by 300ms for improved performance.
- **Personalized Greetings**: Names in header on log in and user account page
- **Reviews**: Logged in users can leave reviews on products
- **User Account Page**: Logged in users can review their reviews, receipts and wishlists
- **Admin Account Page: Invoices**: Logged in admins can get invoices of all customers including a search functionality
- **Admin Account Page**: Logged in admins can make pdf shipping labels of purchases
- **Backend Payment Processing**: Using stripe, orders are processes using production ready technology - just need to switch from test to developer server

## Attention to Security

- **Server Side Env Variables**: .env file during development and env variable then manually entered into openshift so passwords and api keys never exposed on gitlab - all env loaded using os.getenv()
- **JWT tokens**: with 60 min life spans and 7 day refresh allowing secure login authorization
- **No session cookies**: so protection against CSRF attacks
- **Stripe Tokens**: rather than standard charges, user details converted to a token and then sent to backend before being processed by Stripe => no storage of sensitive details and data sent encrypted/ secure
- **React**: data is sanitized by functions so no exposed strings for XSS injection attacks
- **Strong Passwords**: Passwords must be at least 8 character, 1 lowercase, 1 uppercase letter and 1 number - checked with regex
- **Client and Server Side Validation**: Password's checked both sides to prevent submissions e.g. with POSTMAN
- **npm audit**: so all packages up to date with 0 known vulnerabilities
- **Validate Email**: protection against fake accounts
- **Logout**: clears local storage of tokens to help protect against XSS attacks
- **Force Logout**: force logout when tokens expire
- **Role Protected Routes**: so only users with correct permissions can access
- **Non-personal user data stored in DB**: not local storage e.g. wishlist, cart details
- **Return Correct Status Codes**: API requests return appropriate status codes e.g. 200, 201, 400, 401 etc and not just json objects

## Attention to Design

- **3828 Cards/ Products**: And easy to add more with the set name added to pokemon_sets.txt file
- **20 SQL tables**: 15 for just the pokemon cards
- **Modern React**: Using hooks rather than class components
- **SPA (Single Page Application)**: fast page renders with no "refresh" screens delivering better user experience than standard server side requests
- **React State** gives real time feedback when filling in forms and searching
- **Chakra-UI**: uses JSS rather than CSS which has the advantages:
  - Incremental compilation and rendering (as soon as needed).
  - Rendered styles are cached => Compilation and DOM Rules creation happens only once.
  - Only styles which are currently in use on your screen are also in the DOM.
  - Simple class selectors ensure high selectors performance at scale.
- **Loaders**: so user aware when data is loading/ being fetched
- **Cart Saved**: not just local session but when user logs out, cart is cleared but when they log back in, it is repopulated as data was stored in a db.
- **Fully Mobile Responsive**: Works on any screen size > 300px.
- **Mobile and Desktop differences**: e.g. collapsing nav bar on mobile, replaced text with icons for space reasons etc
- **SCSS**: more flexible than css - nesting, variables etc - only used for bespoke styles and animations e.g. pokeball loader
- **404 Error Page**: To catch wrong routes e.g. enter by user in browser
- **Dark and Light Mode**: Dark and Light modes for optimal user experience
- **Visual Feedback**: Toasts, shakes and alerts used for visual feedback.
- **Tooltips**: Forms have tooltips to help fill in when hovered over
- **Screen Reader Compliant**: Aria labels, alt text info used for those with special needs
- **Coloured Scrollbars**: separate code needed for firefox and chrome to be cross-platform
- **Cart Closes Clicking Outside Button**: Event listeners used for clicks outside of buttons - gives good user experience as cart now closes by clicking anywhere

## Code Quality

- Code compartmentalized into folders with dot syntax to easily identify them eg .component, .styles etc
- Asynchronous programming using async and await
- Functional programming to use react state
- Python: PEP8 styled code
- React: ES6 javascript syntax conventions e.g. component deconstructing, spread operator etc
- Memoization used to optimize react components
- MySQL database made from 20 separate tables with appropriate foreign key constraints and back_populate references in the ORM db
- Marshmallow Schemas to jsonify data
- Regex used frequently e.g. to pull token from request, password checking etc
