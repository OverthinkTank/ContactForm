//Generated URL from AWS_APi Gateway
var AWS_URL = "https://cdpr9pg06h.execute-api.us-west-2.amazonaws.com/Prod/sendemail";

const {
    colors,
    CssBaseline,
    ThemeProvider,
    Typography,
    Container,
    makeStyles,
    createMuiTheme,
    Box,
    SvgIcon,
    Link,
    TextField,
    Form,
    FormControl,
    Input,
    InputLabel,
    Button,
    Snackbar,
    Alert,
    CircularProgress
} = MaterialUI;

/**
 * validates and sends data to backend
 * @param {object} e 
 */
function submitToAPI(e) {
    e.preventDefault();

    ReactDOM.render(<span className=""></span>, document.querySelector('#span-message'));

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var data = {
        name: name,
        email: email,
        message: message
    };

    //taking the form object
    var contact_form = document.getElementById('contact-form');

    //using material ui form validation
    if (contact_form.reportValidity()) {
        ReactDOM.render(<span className="success label"> Submitting data... </span>, document.querySelector('#span-message'));

        //if all fields are valid... save the data
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", AWS_URL);
        xmlhttp.setRequestHeader("Content-Type", "application/json");

        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                console.log(xmlhttp);
                var response = JSON.parse(xmlhttp.response);
                if (xmlhttp.status === 200 && response.error == 0) {
                    console.log('successful');
                    SuccessMessage(response.message);
                    contact_form.reset();
                } else {
                    document.getElementById("contact-form").innerHTML = response.message;
                }
            }
        }
    }
}
// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: colors.red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

/**
 * Validation Bulb Icon
 * @param {String} props 
 */
function LightBulbIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
        </SvgIcon>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
        verticalAlign: 'middle',
        marginRight: theme.spacing(1),
    },
}));


/**
 * creating and validating Contact-form
 */
function App() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            margin: 20,
            padding: 20
        }} >
            <form style={{ width: "50%" }} id="contact-form">
                <h1>Contact Form</h1>

                <FormControl margin="normal" fullWidth>
                    <TextField required id="name" type="name" label="Name" variant="outlined" onBlur={event => validate(event)} />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <TextField required id="email" type="email" label="Email" variant="outlined" onBlur={event => validate(event)} />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <TextField required id="message" type="message" label="Message" variant="outlined" multiline rows={10} onBlur={event => validate(event)} />
                </FormControl>

                <Button onClick={(event) => { submitToAPI(event) }} variant="contained" color="primary" size="medium" type="button" >
                    Submit
      </Button>

                <span id="span-message"></span>
            </form>
        </div>
    );
}

/**
 * check form validity
 * @param {Object} event 
 */
function validate(event) {
    console.log(event);
}

function LoadingMessage() {
    return (
        <span> Submitting... </span>
    );
}

/**
 * print success message
 * @param {string} msg 
 */
function SuccessMessage(msg) {
    ReactDOM.render(<span className="success label"> {msg} </span>, document.querySelector('#span-message'));
    setTimeout(function() {
        document.getElementById("span-message").innerHTML = "";
    },5000)
}

/**
 * print error message
 * @param {string} msg 
 */
function ErrorMessage(msg) {
    ReactDOM.render(<span className="error label"> {msg} </span>, document.querySelector('#span-message'));
}

/**
 * rendering App function
 */
ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.querySelector('#root'),
);