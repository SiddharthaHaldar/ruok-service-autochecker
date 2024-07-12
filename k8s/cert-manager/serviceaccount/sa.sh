ROBOT=clouddns
DNS=phx-01h7dnj5j46f52sev8akqd9m7g

gcloud iam service-accounts create ${ROBOT} \
--display-name=${ROBOT} \
--project=${DNS}

gcloud iam service-accounts keys create ./${ROBOT}.key.json \
--iam-account=clouddns@${DNS}.iam.gserviceaccount.com \
--project=${DNS}

gcloud projects add-iam-policy-binding ${DNS} \
--member=serviceAccount:${ROBOT}@${DNS}.iam.gserviceaccount.com \
--role=roles/dns.admin

kubectl create secret generic ${ROBOT} \
--from-file=./clouddns.key.json \
--namespace=cert-manager