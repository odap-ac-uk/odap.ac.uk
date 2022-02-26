

<!--
Outbreak data analysis platform
-->

The ODAP is guided and overseen by the ODAP Partnership, a collaboration among nationwide research studies, public health agencies, the NHS and clinicians and scientists.

## Scope

The purpose of the ODAP is to facilitate biomedical research to advance understanding of disease caused by emerging or re-emerging pathogens\* or other exposures\*\* of public health interest. Research within the ODAP is strictly limited to this purpose. 

\*Emerging or re-emerging pathogens of public health interest: this term describes new infectious agents, and new, re-emerging or therapy-resistant forms of existing infectious agents. 

\*\*Other exposures of public health interest: this term describes new or unexplained poisoning, or exposure to harmful energy sources such as electromagnetic radiation.


# What it is

- The purpose of the outbreak data analysis platform is to provide an accessible, usable data resource to enable research relevant to COVID-19 and future outbreaks. This will accelerate scientific understanding of new outbreaks for the benefit of patients and the protection of the public.
- It will create a UK-wide capability by curating and linking outbreak relevant data from clinical records, research studies and audit data. It brings together key initiatives and leadership across the UK including ISARIC, COG-UK, MRC CLIMB and GenOMICC. 
- The platform combines a national Trusted Research Environment (TRE) infrastructure collocated with >£100M of world-class computational and data science capacity including the UK National Supercomputer, with a UK-wide governance framework.


# What it isn't

- It is not a replacement for public health activities. The platform will work closely with public health agencies across the 4 nations and with UK HSA, providing research insights and data feeds where useful to augment surveillance capacity, and a tried-and-tested route to engage additional analytic capacity and expertise from the academic sector.
- It is not a viral sequence analysis platform. The excellent MRC CLIMB resource (a partner in this programme) provides excellent resources and infrastructure for analysis, presentation and sharing of viral sequences.
- It is not a replacement for existing TREs. The analysis platform is a focused capability of the UKSA-accredited TRE hosted by Public Health Scotland, and will provide curated data feeds to TREs across the UK to facilitate and supplement data held elsewhere as part of a UK federated network.


# Design of the platform

## Data held

The platform already contains a unique aggregation of UK sovereign data assets, including the complete data resources of the ISARIC4C/CO-CIN, GenOMICC, PHOSP and UK-CIC studies, together with viral sequence data from COG-UK, and linkage to NHS clinical records and structured clinical audit data. This creates a unique opportunity to combine clinical, biological, genomics and virology research in as secure, openly-accessible framework. Manual curation of these linked datasets, in a single platform, is a key step to maximise data quality and usability.

## Compute power

The platform is located at the UK National Supercomputer, and uses a range of capabilities from rom Private Cloud TRE infrastructure to large shared memory systems and massively parallel processing power. There is currently 2.5Pb of storage in use, expandable to many Petabytes as required. GPU servers are in place for massively-parallel applications such as genomics and image analysis

An API structure has been built for real-time data sharing with other trusted research environments across the UK, and to facilitate efficient data pipelines to supply surveillance feeds to public health.


## Structure

There are two routes of access to the analysis platform (@fig:structure):

1. NHS Trusted Research Environment (Safe Haven) for access to personal clinical data and data collected without explicit consent.
2. Rapid-access flexible compute for access to non-disclosive research data collected with explicit consent.

Within both of these environments there are two levels of access, governed by the data contributors:

1. Publishable "open access" data which any user can use and report as they wish, according to data protection and privacy rules;
2. Embargoed active research data, shared by academic investigators and available for linked analysis but not for publication without agreement from all contributors.

This design is intended to demonstrate trust in order to encourage immediate contributions of research data from academic collaborators. It makes data available immediately for discovery, whilst protecting the rights of data creators and contributors.

![Structure of the Outbreak Analysis Platform](https://isaric4c.net/img/ap/i4c-analysis-platform-updated.png){#fig:structure width=90% }


# Research outputs

The proposal builds upon an established track record of impact. By generating, integrating and analysing clinical, biological, genetic and virological data on patients with Covid-19 in UK hospitals, the outbreak analysis platform has facilitated research that:

- provided essential weekly updates to SAGE that guide the public health response [isaric4c.net/reports/](https://isaric4c.net/reports/), 
- identified host genetic mechanisms of disease, [@pairocastineirageneticmechanismscritical2021]
- quantified the role of age, comorbid illness and obesity in disease severity,[@dochertyfeatures201332020] 
- created the global standard ISARIC4C score for prognostication [isaric4c.net/risk](isaric4c.net/risk),[@knightriskstratificationpatients2020] 
- determined the impact of long Covid following hospitalisation[@groupphysicalcognitivemental2021]
- identified the substantial effect of transmission of Covid-19 within hospitals [SPI-M/SAGE report](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/961210/S1056_Contribution_of_nosocomial_infections_to_the_first_wave.pdf),
- provided key evidence underlying the choice of therapeutic agents for clinical trials[@thwaitesinflammatoryprofilesspectrum2021; @pairocastineirageneticmechanismscritical2021]
- provided real world data on vaccine effectiveness and failure (SAGE 87 Egan et al,  Egan et al.) 
- observed data supporting identification of high risk groups for vaccination (highlighted in No10 briefing)
- described the complications of Covid-19 in hospitalised patients.[@drakecharacterisationinhospitalcomplications2021]

# Current data content

This platform now serves as a hub for a coordinated UK national research response to COVID-19. Data are included from:

- ISARIC4C tier 0: (unconsented) prospective clinical data from 298,836 cases
- ISARIC4C tiers 1 and 2: serial multiomic assays from research samples of blood, respiratory secretions, urine, and stool from 2,505 cases
- COG-UK: (unconsented) summary variant data from COG-UK viral sequencing study is already included for matched patients
- GenOMICC study complete data: microarray/whole genome sequence data from 18,158 cases
- PHOSP complete data: follow-up clinical and biological data generated by the Post-Hospitalisation for COVID-19 follow-up study (1,075 cases)
- UK-CIC: deep immunological phenotyping data from across the UK Coronavirus Immunology Consortium, using ISARIC4C samples and local collections.

Research data within the analysis platform is already linked to:

- NHS Scotland primary, secondary care and death records
- NHS Digital health records data

In future, plans are in place to transfer data to link with:

- ICNARC and SICSAG critical care audit databases
- NIMS National Immunisation Dataset
- Pillar 1 testing
- Pillar 2 testing
- ONS






<!--

![ISARIC4C study and data analysis platform](https://isaric4c.net/img/ap/i4c-map-updated.png){#fig:map width=60%}

Rules for the embargoed area:

The "under embargo" area contains raw, unpublished data shared by hospitals, investigators and research labs across the country. It exists to accelerate discovery in a global crisis. 

1. involve people early
The first rule of shared analysis is never to present data contributors with a *fait accompli* - that is, don't rush ahead and finish an analysis, or even worse, a manuscript, without letting the people who made it possible know what you're doing, and giving them an opportunity to contribute meaningfully to the design and write up. That means people at every stage in the procedure, from recruitment and management to laboratory and data analysis.
2. share your plans
All users in the embargo area will also have access to the ISARIC4C consortium-wide slack group and weekly meetings. When you come up with new ideas, post about them and discuss them with the rest of the consortium. 
3. primacy of data generation. For most analyses inside the embargo area, the novelty is in the samples and data themselves, rather than in the laboratory or computational analyses that finished the job. For each piece of work, ask yourself, why has no-one else done this yet? Did you make the cake, or just put icing on one? When you come to publish, share academic credit accordingly.

-->



<!--
# Background


## Earning trust from data contributors

The default position is that data are contributed under embargo, prohibiting publication or general release until authorised by the data contributor. All contributors will agree to abide by this rule in good faith. Embargoed data will be available to other contributors during the embargo period, and will be released into the open analysis platform at or before the time of the first pre-print report.

A critical determinant of success is building sufficient trust among contributors to ensure that data are contributed in an accessible format as early as possible. Data sharing within the ISARIC4C consortium continues to have the support and goodwill of contributors, because:
- there is a palpable urgency created by the COVID-19 crisis;
- the platform has earned the trust of contributors and will maintain it by enforcing embargo rules;
- there is a clear expectation from patients, the public, funders and government;
- there is primary benefit to data contributors to gain access to other unpublished data and analysis platforms.

## Principles

ISARIC4C is built on top of existing pandemic preparedness infrastructure, designed, established, maintained and tested during the interpandemic period (@fig:map),[@dunningopensourceclinical2014] and harmonised across the world.[@akhvledianiglobaloutbreakresearch2020] It is an open-access national resource: we have already shared data on 298,836 participants and 4273 samples with 26 external groups.

The success of ISARIC4C is largely due to the following foundational principles:

- no group, funder, collaborator or other party will have exclusive access to data or samples
- consortium resources (samples, data and funds) will be prioritised according to likelihood of rapid impact on the COVID-19 pandemic
- all data generated using ISARIC4C resources is shared in a machine-readable format within the Integrated Analysis Platform

## Open analysis platform for deidentified data

The analysis platform is being used to provide itegrated analyses of genetic associations with multiple phenotypes,[@canela-xandriAtlasGeneticAssociations2018] functional genomics,[@forrestpromoterlevelmammalianexpression2014] and multi-omics critical illness trajectories,[@neytonMolecularPatternsAcute2020] within the largest clinical study of COVID-19 anywhere in the world.[@dochertyfeatures20133patients2020]

The platform hosts overlapping datasets from across the UK. Individual patient consent enables sharing of linked whole-genome sequence data, whole-blood transcriptomics, proteomics, cytokine measurements, viral load and sequence, and clinical data. This will enable a range of discovery science with direct therapeutic applications, including subphenotype classification and extended causal inference using Mendelian randomisation and related approaches.

Providing clean, linked, deidentified data in a format that is easily accessible to researchers from a range of backgrounds requires staff with a high level of skill in clinical epidemiology, data science, and software engineering. Data will be systematically cleansed and linked, missing data completed in an iterative process interacting with analysis teams, and presented in curated flat files and through an integrated relational database. This will be presented to users through four interfaces:

1. a user-friendly browsable interface enabling data selection and subgrouping through dropdown menus to subset patient populations by clinical and biological data and run *de novo* GWAS analyses using a GPU platform (GOLEM, Tenesa group), multivariable regression, propensity-matching, unsupervised clustering and other analyses.

2. flexible analysis through bespoke, secure virtual machines operated through a command line interface providing access to R, Python, and other software as required by the user.

3. a well-documented application programming interface (API) enabling external computational queries. This allows all data in the ISARIC4C platform to contribute to federated data analysis frameworks at national and international level. Collaborating groups such as OPENSafely and Genomics England will be able to run queries seamlessly from external platforms.

4. a limited, anonymised, downloadable dataset comprising key variables from all participants.

Deidentified data will be available openly to *bona fide* researchers for unrestricted analyses

## Data safe haven

A linked, secure NHS data safe haven will provide access to identifiable data, and data collected without individual patient consent, for qualified, approved researchers performing research to improve patient care. This incorporates full ISARIC COVID case report forms for 46,000 patients, together with health records linkage (CAG section 251 and PBPP approvals in place).

This will enable detailed, rich clinical analyses with corrections for confounding and bias caused by social factors, comorbid illness and medications, and opens a range of detailed information to characterise acute disease using clinical measurements acquired from electronic health records.


| Dataset                           | Governance responsibility | Delegates  |
| --------------------------------- | ------------------------ | -------------------------------------------- |
| [ISARIC4C TIERS 0(CO-CIN)/1/2](https://isaric4c.net/analysis-platform)   | Kenneth Baillie (for IDAMAC) | Calum Semple; Gary Leeming; Andy Law;  Wilna Oosthuyzen |
| COG-UK | Sharon Peacock   | Ewan Harrison |
| PHOSP  | Chris Brightling | Aarti Parmar  |
| [GenOMICC](https://genomicc.org/data)   | Kenneth Baillie  | Andy Law; Alison Meynert; Wilna Oosthuyzen  |
| UK CIC | Paul Moss  |   |
| [SICSAG](https://www.isdscotland.org/Health-Topics/Scottish-Healthcare-Audits/Scottish-Intensive-Care-Society-Audit-Group/) | Naz Lone (for SICSAG steering committee) |   |
| [Outpatients (SMR00)](https://www.ndc.scot.nhs.uk/National-Datasets/data.asp?ID=1&SubID=4) |   |   |
| [GeneralAcute and Inpatient Day Case dataset (SMR01)](https://www.ndc.scot.nhs.uk/National-Datasets/data.asp?ID=1&SubID=5)  |   |   |
| [Prescribing Information System (PIS)](https://www.isdscotland.org/health-topics/prescribing-and-medicines/_docs/Open_Data_Glossary_of_Terms.pdf?1) |   |   |
| [NRS Deaths](https://www.ndc.scot.nhs.uk/National-Datasets/data.asp?ID=3&SubID=13)   |   |   |
| Primary Care | GP committee  |   |
| NHS England  |   |   |
| NIMS National Immunisation Dataset   |   |   |
| Pillar 1 testing   |   |   |
| Pillar 2 testing   |   |   |

-->

<!--
## Use cases

Genomics person docker containers

-->



# References





