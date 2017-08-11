/**
 *
 The form has the following fields:
 - gender (available options: "female", "male")
 - firstname
 - lastname
 - email (email format)
 - phone
 - age (1-99)
 - zip (min 3 , max 5 digits)
 - termsAccepted
 *
 */
class ApplicationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            gender: '',     // (available options: "female", "male")
            email: '',      // (email format)
            phone: '',
            age: '',        // (1-99)
            zip: '',        // (min 3 , max 5 digits)
            termsAccepted: false,
            wasSuccessful: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch ( event.target.id ) {
            case 'firstname':
                this.setState({firstname: event.target.value});
                break;
            case 'lastname':
                this.setState({lastname: event.target.value});
                break;
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'phone':
                this.setState({phone: event.target.value});
                break;

            case 'zip':
                this.setState({zip: event.target.value});
                break;
            case 'age':
                this.setState({age: event.target.value});
                break;

            case 'gender':
                this.setState({gender: event.target.value});
                break;
            case 'termsAccepted':
                this.setState({termsAccepted: !!event.target.value});
                break;

            default:

        }
    }

    validateZip(event) {
        const elZip = event.target;
        const vZip = elZip.value;

        //  pattern="\d{3,5}"
        //var constraint = /\d{3,5}/;
        //console.log(constraint);
        //if (constraint.test(vZip)) {

        if (vZip.length < 3 || vZip.length > 5) {
            elZip.setCustomValidity( 'Zip code (min 3, max 5 digits)' );
        } else {
            elZip.setCustomValidity('');
        }
        console.log(`validity.valid = ${elZip.validity.valid} value: ${vZip}`);
    }

    handleSubmit(event) {

        event.preventDefault();
        const request = fetch('/api/applications', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });
        request
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    this.setState({wasSuccessful: false});
                    throw new Error('Data wasn\'t saved.');
                }
            })
            .then(json => {
                console.log(`SUCCESS: ${JSON.stringify(json)}`);
                this.setState({wasSuccessful: true});
            })
            .catch(err => console.error(err));

    }

    render() {

        let done = this.state.wasSuccessful;
        if (done) {

            return (
                <div>
                    <h3>Thanks !</h3>
                    <p>Your application was saved successfully.</p>
                    <br/>
                    <a href="/">Go to Home Page</a>
                </div>
            );

        } else {

            return (
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="firstname">Firstname:</label>
                    <input id="firstname" type="text" value={this.state.firstname} onChange={this.handleChange}
                           required/>
                    <br/>
                    <label htmlFor="lastname">Lastname:</label>
                    <input id="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} required/>
                    <br/>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" value={this.state.gender} onChange={this.handleChange} required>
                        <option value="">-- Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                    <br/>
                    <label htmlFor="age">Age:</label>
                    <input id="age" type="number" min="1" max="99" value={this.state.age} onChange={this.handleChange}
                           required/>
                    <br/>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" value={this.state.email} onChange={this.handleChange} required/>
                    <br/>
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" type="text" value={this.state.phone} onChange={this.handleChange} required/>
                    <br/>
                    <label htmlFor="zip">Zip:</label>
                    <input id="zip" type="number" value={this.state.zip} onChange={this.handleChange} required
                           placeholder="min 3, max 5 digits" onInput={this.validateZip}/>
                    <br/><br/>

                    <label htmlFor="termsAccepted">I Accept Terms:</label>
                    <input id="termsAccepted" type="checkbox" onChange={this.handleChange} required/>
                    <br/><br/>

                    <input type="submit" value="Submit"/>

                </form>

            );
        }
    }
}

ReactDOM.render(
    <ApplicationForm />,
    document.getElementById('root')
);

