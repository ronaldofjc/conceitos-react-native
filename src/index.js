import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

// View: div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2

export default function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('/projects').then(res => {
			console.log(res.data);
			setProjects(res.data);
		});
	}, []);

	async function handleAddProject() {
		const res = await api.post('/projects', {
			title: `Novo projeto ${Date.now()}`,
			owner: 'Ronaldo Feitosa'
		});

		const project = res.data;

		setProjects([...projects, project]);
	}

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#7159c1" />

			<SafeAreaView style={styles.container}>
				<FlatList 
					data={projects}
					keyExtractor={project => project.id}
					renderItem={({ item: project }) => (
						<Text key={project.id} style={styles.project}>
							{project.title}
						</Text>
					)}
				/>
				<TouchableOpacity 
				activeOpacity={0.6} 
				style={styles.button} 
				onPress={handleAddProject}
				>
					<Text style={styles.buttonText}>Adicionar projeto</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#7159c1'
	},
	project: {
		color: '#FFF',
		fontSize: 20,
		marginLeft: 10,
	},
	button: {
		backgroundColor: '#FFF',
		margin: 20,
		height: 50,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 16,
	}
});