import { Site } from "models";

const sites: Site[] = [
  {
    name: "ESRF ISPyB",
    server: "https://ispyb.esrf.fr/ispyb/ispyb-ws/rest",
    description: "European Synchroton Radiation Facility",
    icon: "../images/site/esrf.png",
    authentication: {
      sso: {
        enabled: false,
        plugin: "keycloak",
        configuration: {
          realm: "ESRF",
          url: "https://websso.esrf.fr/auth/",
          clientId: "icat",
        },
      },
      authenticators: [
        {
          plugin: "db",
          title: "ISPyB",
          server: "https://ispyb.esrf.fr/ispyb/ispyb-ws/rest",
          enabled: true,
          site: "ESRF",
          message: "Use ISPyB authentication when you log in as a proposal",
        },
      ],
    },

    techniques: {
      SAXS: { beamlines: [{ name: "BM29" }] },
      EM: { beamlines: [{ name: "CM01" }] },
      MX: {
        beamlines: [
          { name: "ID23-1", sampleChangerType: "FlexHCDDual" },
          { name: "ID23-2", sampleChangerType: "FlexHCDUnipuckPlate" },
          { name: "ID29", sampleChangerType: "FlexHCDDual" },
          { name: "ID30A-1", sampleChangerType: "RoboDiffHCDSC3" },
          { name: "ID30A-2", sampleChangerType: "FlexHCDDual" },
          { name: "ID30A-3", sampleChangerType: "FlexHCDDual" },
          { name: "ID30B", sampleChangerType: "FlexHCDDual" },
          { name: "BM30A", sampleChangerType: "FlexHCDDual" },
        ],
      },
    },
  },
  {
    name: "ESRF EM(only)",
    server: "https://ispyb.esrf.fr/ispyb/ispyb-ws/rest",
    description: "European Synchroton Radiation Facility",
    icon: "../images/site/esrf.png",
    authentication: {
      sso: {
        enabled: process.env.REACT_APP_SSO_AUTH_ENABLED === "true",
        plugin: "keycloak",
        configuration: {
          realm: "ESRF",
          url: "https://websso.esrf.fr/auth/",
          clientId: "icat",
        },
      },
      authenticators: [
        {
          plugin: "db",
          title: "ISPyB",
          server: "https://ispyb.esrf.fr/ispyb/ispyb-ws/rest",
          enabled: true,
          site: "ESRF",
          message: "Use ISPyB authentication when you log in as a proposal",
        },
      ],
    },

    techniques: {
      EM: { beamlines: [{ name: "CM01" }] },
    },
  },
  {
    name: "ESRF PY-ISPyB",
    server: "http://lgaonach:5000/ispyb/api/v1/legacy",
    description: "European Synchroton Radiation Facility",
    icon: "../images/site/esrf.png",
    authentication: {
      sso: {
        enabled: process.env.REACT_APP_SSO_AUTH_ENABLED === "true",
        plugin: "keycloak",
        configuration: {
          realm: "ESRF",
          url: "https://websso.esrf.fr/auth/",
          clientId: "icat",
        },
      },
      authenticators: [
        {
          plugin: "db",
          title: "ISPyB",
          server: "https://ispyb.esrf.fr/ispyb/ispyb-ws/rest",
          enabled: true,
          site: "ESRF",
          message: "Use ISPyB authentication when you log in as a proposal",
        },
      ],
    },

    techniques: {
      SAXS: { beamlines: [{ name: "BM29" }] },
      EM: { beamlines: [{ name: "CM01" }] },
      MX: {
        beamlines: [
          { name: "ID23-1", sampleChangerType: "FlexHCDDual" },
          { name: "ID23-2", sampleChangerType: "FlexHCDUnipuckPlate" },
          { name: "ID29", sampleChangerType: "FlexHCDDual" },
          { name: "ID30A-1", sampleChangerType: "RoboDiffHCDSC3" },
          { name: "ID30A-2", sampleChangerType: "FlexHCDDual" },
          { name: "ID30A-3", sampleChangerType: "FlexHCDDual" },
          { name: "ID30B", sampleChangerType: "FlexHCDDual" },
          { name: "BM30A", sampleChangerType: "FlexHCDDual" },
        ],
      },
    },
  },

  {
    name: "EMBL",
    server: "https://ispyb.embl-hamburg.de/ispyb/ispyb-ws/rest",
    description: "European Molecular Biology Laboratory",
    icon: "../images/site/esrf.png",
    authentication: {
      sso: {
        enabled: false,
      },
      authenticators: [
        {
          plugin: "db",
          title: "ISPyB",
          server: "https://ispyb.embl-hamburg.de/ispyb/ispyb-ws/rest",
          enabled: true,
          site: "EMBL",
          message: "Use ISPyB authentication when you log in as a proposal",
        },
      ],
    },

    techniques: {
      EM: {
        beamlines: [
          {
            name: "P13",
            sampleChangerType: "RoboDiff",
          },
          {
            name: "P14",
            sampleChangerType: "Robodiff",
          },
          {
            name: "PE2",
            sampleChangerType: "Robodiff",
          },
        ],
      },
    },
  },

  {
    name: "MAXIV",
    server: "https://ispyb.maxiv.lu.se/ispyb/ispyb-ws/rest",
    description: "MAX IV Laboratory",
    icon: "../images/site/esrf.png",
    authentication: {
      sso: {
        enabled: false,
      },
      authenticators: [
        {
          plugin: "db",
          title: "ISPyB",
          server: "https://ispyb.maxiv.lu.se/ispyb/ispyb-ws/rest",
          enabled: true,
          site: "MAXIV",
          message: "Use ISPyB authentication when you log in as a proposal",
        },
      ],
    },

    techniques: {
      EM: {
        beamlines: [
          {
            name: "BioMAX",
            sampleChangerType: "ISARA",
          },
        ],
      },
    },
  },
];

export default sites;
