import time
import json
import random
from datetime import datetime
from awscrt import io, mqtt, auth, http
from awsiot import mqtt_connection_builder

# --- CONFIGURATION ---
ENDPOINT = "a2z8ncu2dkw79g-ats.iot.ap-south-1.amazonaws.com"
CLIENT_ID = "TravelerDevice_001"
PATH_TO_CERT = "certs/certificate.pem.crt"
PATH_TO_KEY = "certs/private.pem.key"
PATH_TO_ROOT_CA = "certs/AmazonRootCA1.pem"
TOPIC = "traveler/telemetry"

# Initial starting location (Hyderabad coordinates)
lat = 17.3850
lon = 78.4867

# Spin up event loop
event_loop_group = io.EventLoopGroup(1)
host_resolver = io.DefaultHostResolver(event_loop_group)
client_bootstrap = io.ClientBootstrap(event_loop_group, host_resolver)

mqtt_connection = mqtt_connection_builder.mtls_from_path(
    endpoint=ENDPOINT,
    cert_filepath=PATH_TO_CERT,
    pri_key_filepath=PATH_TO_KEY,
    ca_filepath=PATH_TO_ROOT_CA,
    client_bootstrap=client_bootstrap,
    client_id=CLIENT_ID,
    clean_session=False,
    keep_alive_secs=30
)

print(f"Connecting to {ENDPOINT} with client ID '{CLIENT_ID}'...")
connect_future = mqtt_connection.connect()
connect_future.result()
print("Connected!")

# Send mock telemetry loop
try:
    while True:
        # Simulate slight movement
        lat += random.uniform(-0.001, 0.001)
        lon += random.uniform(-0.001, 0.001)
        
        # Simulate sensor metrics (occasionally trigger an anomaly/fall)
        is_fall = random.choice([False, False, False, False, True]) if random.random() < 0.1 else False
        impact = random.uniform(3.0, 5.2) if is_fall else random.uniform(0.8, 1.2)
        heart_rate = random.randint(140, 165) if is_fall else random.randint(65, 95)
        
        payload = {
            "traveler_id": CLIENT_ID,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "latitude": round(lat, 6),
            "longitude": round(lon, 6),
            "speed_kmh": round(random.uniform(20.0, 60.0), 1),
            "heart_rate_bpm": heart_rate,
            "body_temp_c": round(random.uniform(36.2, 37.5), 1),
            "impact_g": round(impact, 2),
            "fall_detected": is_fall
        }

        print(f"Publishing to {TOPIC}: {json.dumps(payload, indent=2)}")
        mqtt_connection.publish(
            topic=TOPIC,
            payload=json.dumps(payload),
            qos=mqtt.QoS.AT_LEAST_ONCE
        )
        time.sleep(5) # Send telemetry every 5 seconds

except KeyboardInterrupt:
    print("Disconnecting...")
    disconnect_future = mqtt_connection.disconnect()
    disconnect_future.result()
    print("Disconnected!")