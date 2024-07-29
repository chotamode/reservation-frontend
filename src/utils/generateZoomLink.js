import axios from 'axios';

async function generateZoomLink() {
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
        topic: 'Psychologist Appointment',
        type: 1, // Instant meeting
        settings: {
            host_video: true,
            participant_video: true
        }
    }, {
        headers: {
            'Authorization': `Bearer YOUR_ZOOM_JWT_TOKEN`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 201) {
        throw new Error('Failed to create Zoom meeting');
    }

    return response.data.join_url;
}

export default generateZoomLink;