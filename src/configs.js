import { Regex } from '@companion-module/base'

export function getConfigFields() {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: `<strong>PLEASE READ THIS!</strong> Generic modules are only for use with custom applications.
					If you use this module to control a device or software on the market that more than you are using,
					<strong>PLEASE let us know</strong> about this software, so we can make a proper module for it.
					If we already support this and you use this to trigger a feature our module doesn't support, 
					please let us know. We want Companion to be as easy as possible to use for anyone.`,
		},
		{
			type: 'textinput',
			id: 'ip',
			label: 'Agent Address',
			width: 6,
			regex: Regex.IP,
			default: '127.0.0.1',
			required: true,
		},
		{
			type: 'number',
			id: 'port',
			label: 'UDP Port',
			width: 6,
			min: 1,
			max: 65535,
			default: 161,
			required: true,
		},
		{
			type: 'dropdown',
			id: 'version',
			label: 'SNMP Version',
			width: 6,
			choices: [
				{ id: 'v1', label: 'SNMP v1' },
				{ id: 'v2c', label: 'SNMP v2c' },
				{ id: 'v3', label: 'SNMP v3' },
			],
			default: 'v1',
			require: true,
		},
		{
			type: 'textinput',
			id: 'community',
			width: 6,
			label: 'Community',
			default: 'companion',
			isVisible: ({ version }) => version === 'v1' || version === 'v2c',
		},
		{
			type: 'static-text',
			id: 'infov3',
			width: 12,
			value: '<h5>SNMP v3 Configuration</h5>',
			isVisible: ({ version }) => version === 'v3',
		},
		{
			type: 'textinput',
			id: 'engineID',
			width: 6,
			label: 'Engine ID',
			default: '',
			isVisible: ({ version }) => version === 'v3',
		},
		{
			type: 'textinput',
			id: 'username',
			width: 6,
			label: 'User Name',
			default: 'companion',
			isVisible: ({ version }) => version === 'v3',
		},
		{
			type: 'dropdown',
			id: 'securityLevel',
			label: 'Security Level',
			width: 12,
			choices: [
				{ id: 'noAuthNoPriv', label: 'noAuthNoPriv - No message authentication or encryption' },
				{ id: 'authNoPriv', label: 'authNoPriv - Message authentication and no encryption' },
				{ id: 'authPriv', label: 'authPriv - Message authentication and encryption' },
			],
			default: 'noAuthNoPriv',
			isVisible: ({ version }) => version === 'v3',
		},
		{
			type: 'dropdown',
			id: 'authProtocol',
			label: 'Auth Protocol',
			width: 6,
			choices: [
				{ id: 'md5', label: 'MD5 message authentication (HMAC-MD5-96)' },
				{ id: 'sha', label: 'SHA message authentication (HMAC-SHA-96)' },
			],
			default: 'md5',
			isVisible: ({ version, securityLevel }) =>
				version === 'v3' && (securityLevel === 'authNoPriv' || securityLevel === 'authPriv'),
		},
		{
			type: 'textinput',
			id: 'authKey',
			label: 'Auth Key',
			width: 6,
			default: '',
			isVisible: ({ version, securityLevel }) =>
				version === 'v3' && (securityLevel === 'authNoPriv' || securityLevel === 'authPriv'),
		},
		{
			type: 'dropdown',
			id: 'privProtocol',
			label: 'Priv Protocol',
			width: 6,
			choices: [
				{ id: 'des', label: 'DES encryption (CBC-DES)' },
				{ id: 'aes', label: '128-bit AES encryption (CFB-AES-128)' },
				{ id: 'aes256b', label: '256-bit AES encryption (CFB-AES-256) with "Blumenthal" key localiztaion' },
				{ id: 'aes256r', label: '256-bit AES encryption (CFB-AES-256) with "Reeder" key localiztaion' },
			],
			default: 'des',
			isVisible: ({ version, securityLevel }) => version === 'v3' && securityLevel === 'authPriv',
		},
		{
			type: 'textinput',
			id: 'privKey',
			label: 'Priv Key',
			width: 6,
			default: '',
			isVisible: ({ version, securityLevel }) => version === 'v3' && securityLevel === 'authPriv',
		},
	]
}
