# Security Specification - Teleférico Tower Observations

## Data Invariants
- A tower observation must correspond to a valid tower code (P01-P32).
- Only authenticated users can create or update observations.
- `updatedAt` must be the server timestamp.
- `updatedBy` must match the authenticated user's UID.

## The "Dirty Dozen" Payloads (Rejected Cases)
1. **Unauthenticated Write**: Attempting to write without being signed in.
2. **Identity Spoofing**: Setting `updatedBy` to a different UID.
3. **Invalid Tower Code**: `towerCode` like "XYZ" or "P999".
4. **Massive Observation**: `observation` string > 2000 characters.
5. **Future Timestamp**: Providing a client-side `updatedAt`.
6. **Shadow Field**: Adding `isApproved: true` to the document.
7. **Cross-Document Poisoning**: Writing to `towerObservations/P01` with `towerCode: "P02"`.
8. **Invalid Type**: Setting `observation` as a number.
9. **Missing Required Field**: Omitting `towerCode`.
10. **ID Poisoning**: Using a 2KB string as the document ID.
11. **Malicious Regex**: `towerCode` with special characters like "P01; DROP TABLE".
12. **Anonymous Read**: If PII was involved (none here, but we restrict to authenticated for now).

## Firestore Rules Draft Logic
- `isValidTowerObservation(data)` helper.
- `allow get, list: if isSignedIn();`
- `allow create, update: if isSignedIn() && isValidTowerObservation(incoming()) && incoming().updatedBy == request.auth.uid;`
- `allow delete: if false;` (Observations should not be deleted, just updated).
