import React from "react";

import { useLingui } from "@lingui/react";


import { Trans, Plural } from "@lingui/macro";

import LocaleSwitcher from './LocaleSwitcher';



import { useQuery, gql } from '@apollo/client';
const GET_LOCATIONS = gql`
query {
	endpoints(urls: ["https://github.com/PHACDataHub/ruok-service-autochecker"]) {
    url
  }
}
`;

export default function Inbox() {
    const messages = [{}, {}];
    const messagesCount = messages.length;
    const lastLogin = new Date();
    const endpoints = useQuery(GET_LOCATIONS);
    const markAsRead = () => {
        console.log(endpoints);
        alert("Marked as read.");
    };
    const { i18n } = useLingui();

    return (
        <div>
            <LocaleSwitcher />
            <h1><Trans>Message Inbox</Trans></h1>
            <p>
                <Trans>
                    See all <a href="/unread">unread messages </a>
                    {" or "}
                    <a onClick={markAsRead}>mark them</a> as read.
                </Trans>
            </p>
            <p>
                <Plural value={messagesCount} one="There's # message in your inbox." other="There are # messages in your inbox." />
            </p>
            < footer > <Trans>Last login on {i18n.date(lastLogin)}.</Trans></footer>
        </div>
    );
}