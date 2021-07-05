import React from 'react'

class VehicleTypeComponent extends React.Component {

	state = {
		vehicleTypes: null,
		selectedType: null,
		vehicles: null
	}

	handleTypeChange = e => this.setState({ selectedType: e.target.value })

	componentDidMount() {
		if (!this.state.vehicleTypes) {
			fetch(`https://my-json-server.typicode.com/brian-anderson-iowa/interviewData/vehicleTypes/`)
				.then(response => response.json())
				.then(typesObj => this.setState({ vehicleTypes: typesObj }))
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedType !== prevState.selectedType) {
			fetch(`https://my-json-server.typicode.com/brian-anderson-iowa/interviewData/vehicleTypes/${this.state.selectedType}/vehicles`)
				.then(response => response.json())
				.then(vehiclesObj => this.setState({ vehicles: vehiclesObj }))
		}
	}

	render() {
		return (
			<div id='vehicle-type-component'>
				<h1>Brian's Car Collection</h1>
				<h3>Select Vehicle Type</h3>
				{
					this.state.vehicleTypes &&
					<select value={this.state.selectedType} name="selectedType" onChange={this.handleTypeChange}>
						<option>- select an option -</option>
						{this.state.vehicleTypes.map(typeObj => <option value={typeObj.id}>{typeObj.type}</option>)}
					</select>
				}
				{
					this.state.vehicles &&
					<div>
						{this.state.vehicles.map(vehicle =>
							<div>
								<h3>Make: {vehicle.model}</h3>
								<p>Model: {vehicle.make}</p>
								<p>Year: {vehicle.year}</p>
								<p>Color: {vehicle.color}</p>
							</div>
						)}
					</div>
				}
			</div>
		)
	}
}

export default VehicleTypeComponent