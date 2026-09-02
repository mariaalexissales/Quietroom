# Quietroom - Threat Model and Design

## Purpose

Quietroom is designed for people who are seeking help while under coercive control or intimate partner surveillance (think victims of domestic violence). Most security models (STRIDE, PASTA, VAST) target against anonymous **external** attackers. These assumptions do not hold for the type of adversary that already has legitimate and intimate access to the victim's devices and accounts. This document defines who we are actually defending against, what we're protecting, and what's explicitly out of scope. I will be taking inspiration from the HARMS model written by researchers from the University of Cambridge. If you would like to read more about it, there is a published paper on [arXiv](https://arxiv.org/html/2502.07116v1) that details their model and the case study that exploits smart speaker controls.

## Adversary model

### Primary adversary: intimate partners with legitimate access

#### Capabilities

- Physical access to victim's devices, such as phones, laptops, tablets, or other smart devices. They also know the victim's passcodes and can unlock the device.
- Knowledge of shared account credentials. They don't need to hack anything if they already know your password.
- Co-ownership or admin rights on shared accounts. Including but not limited to joint bank accounts, streaming family plans, and even geolocation sharing apps like Life360.
- Opportunity to glance over at an open screen or check browser history/cache at a later time. This is mostly used to create leverage against the victim for trying to leave or seek advice.

#### What this model does **not** cover

- Network-level interception between the server and the internet at large. Think ISP/state-level traffic analysis TLS is our baseline defense here, and going further is a different, much larger problem we're not solving at this time.
- Legal authority to compel data from us (subpoena, law enforcement request).
- Forensic disk-recovery tools or skills to recover deleted browser data.
