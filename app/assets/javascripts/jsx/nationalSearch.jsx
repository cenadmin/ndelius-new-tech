
class ResultsGrid extends React.Component {

    render() {
        return (
            <ul>
                {this.props.value.map(result => (
                    <li>
                        <span>{result.mistake}</span>
                        <ul>
                            {result.suggestions.map(suggestion => (
                                <li>{suggestion}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    }
}

class OffenderSearch extends React.Component {

    constructor() {
        super();

        this.state = {
            name: "",
            data: []
        };
    }

    componentWillMount() {

        this.performSearch = _.debounce(() => {

            $.getJSON('/spellcheck/' + this.state.name, data => {
                this.setState({
                    data: data
                });
            });
        }, this.props.delay);
    }

    render() {

        var searchChange = ev => this.setState({ name: ev.target.value }, this.performSearch);

        return (
            <div>
                <input value={this.state.name} onChange={searchChange} placeholder="Enter text here" />
                <ResultsGrid value={this.state.data} />
            </div>
        );
    }
}

ReactDOM.render(
    <OffenderSearch delay={500} />,
    document.getElementById('content')
);