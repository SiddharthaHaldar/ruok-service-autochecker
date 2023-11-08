# # From https://medium.com/google-cloud/centrally-managing-artifact-registry-container-image-vulnerabilities-on-google-cloud-part-one-d86fb4791601
# From https://medium.com/google-cloud/centrally-managing-artifact-registry-container-image-vulnerabilities-on-google-cloud-part-one-d86fb4791601
# https://googleapis.dev/python/grafeas/0.4.1/gapic/v1/api.html

# https://cloud.google.com/artifact-analysis/docs/reference/libraries#client-libraries-usage-python

# https://cloud.google.com/artifact-registry/docs/configure-notifications

import base64
import os
import json
import re
from google.cloud.devtools import containeranalysis_v1
from google.cloud import storage
from datetime import datetime

# Get the current timestamp
current_timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
bucket_name = os.environ.get("BUCKET_NAME", "")
RESOURCE_URL = os.environ.get("RESOURCE_URL", "")
PROJECT_ID = os.environ.get("PROJECT_ID", "")

def get_occurrences_for_image(RESOURCE_URL: str, PROJECT_ID: str) -> int:
    """Retrieves all the occurrences associated with a specified image.
    Here, all occurrences are simply printed and counted."""
    # resource_url = 'https://gcr.io/my-project/my-image@sha256:123'
    # project_id = 'my-gcp-project'

    filter_str = f'resourceUrl="{RESOURCE_URL}"'
    client = containeranalysis_v1.ContainerAnalysisClient()
    grafeas_client = client.get_grafeas_client()
    project_name = f"projects/{PROJECT_ID}"

    response = grafeas_client.list_occurrences(parent=project_name, filter=filter_str)
    count = 0
    for o in response:
        # do something with the retrieved occurrence
        # in this sample, we will simply count each one
        count += 1
    return count

def write_vuln_to_bucket(bucket_name, vuln_text, destination_object_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    obj = bucket.blob(destination_object_name)
    obj.upload_from_string(vuln_text)

def image_vuln_pubsub_handler(event, context):
    #get the Pub/Sub message containing the vulnerability occurrence id
    data = json.loads(base64.b64decode(event['data']).decode('utf-8'))

    #load in environment variables for GCS bucket.  
    bucket_name = os.environ.get("BUCKET_NAME", "")

    if bucket_name == '':
        print("Bucket name not set")
        return

    print('Bucket name:', bucket_name)
     # Convert the data to a string
    try:
        data_str = json.dumps(data)
    except Exception as e:
        print(f"Error converting data to JSON: {e}")
        return

    # Upload the string to Cloud Storage
    try:
        write_vuln_to_bucket(bucket_name, data_str, f"{current_timestamp}.json")
    except Exception as e:
        print(f"Error uploading data to GCS: {e}")
    data_str = json.dumps(data)
    
    print(data_str)

    # Upload the string to Cloud Storage
    write_vuln_to_bucket(bucket_name, data_str, f"{current_timestamp}.json")


    # write_vuln_to_bucket(bucket_name, occurrence_info_str, f"{image_name}_{occurrence.vulnerability.short_description}.json")
    # write_vuln_to_bucket(bucket_name, occurrence_info_str, f"{occurrence.name}.json")
    # write_vuln_to_bucket(bucket_name, str(occurrence), f"{occurrence.name}.json")




    # f"{occurrence.name}_occurrence_info.json"
    # write_vuln_to_bucket(bucket_name, str(data), str(occurrence.name))
        # write_vuln_to_bucket(bucket_name, occurrence_info_str, str(occurrence.name))


# # From https://medium.com/google-cloud/centrally-managing-artifact-registry-container-image-vulnerabilities-on-google-cloud-part-one-d86fb4791601
