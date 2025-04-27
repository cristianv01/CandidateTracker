create FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Users Table: Stores login information for Admins and Candidates
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords (e.g., bcrypt)
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'candidate')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for users table updated_at
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- Candidates Table: Stores core candidate information
CREATE TABLE candidates (
    candidate_id SERIAL PRIMARY KEY,
    user_id INT NULL, -- Link to user account if created/claimed
    roster_id VARCHAR(100) NULL UNIQUE, -- Optional: A unique ID from the roster file itself
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NULL,
    email VARCHAR(255) UNIQUE NOT NULL, -- Candidate's primary email
    phone_number VARCHAR(50) NULL,
    address_street VARCHAR(255) NULL,
    address_city VARCHAR(100) NULL,
    address_state VARCHAR(100) NULL,
    address_zip VARCHAR(20) NULL,
    language VARCHAR(100) NULL,
    recruiter_name VARCHAR(150) NULL,
    candidate_status VARCHAR(100) NULL, -- e.g., 'Active', 'Cleared', 'Discontinued', 'Packet Sent'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL -- If user account is deleted, keep candidate record but unlink
);



-- Add index on candidate email for faster lookups
CREATE INDEX idx_candidates_email ON candidates(email);

-- Trigger for candidates table updated_at
CREATE TRIGGER set_timestamp_candidates
BEFORE UPDATE ON candidates
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- Document Types Table: Defines the types of documents/steps required
CREATE TABLE document_types (
    doc_type_id SERIAL PRIMARY KEY,
    doc_code VARCHAR(50) UNIQUE NULL, -- Optional: Code like '2-0-1' from PDFs
    doc_name VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'Personnel Identification Verification (1)'
    description TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    -- No updated_at needed if this table is relatively static
);


-- Add some initial document types based on Capture2.pdf/Capture3.pdf (add more as needed)
INSERT INTO document_types (doc_code, doc_name) VALUES
    ('1-0-1', 'Security Packet Sent to Candidate'),
    ('1-0-2', 'Security Action Received'), -- Typo in PDF? Should be 'Received'?
    ('1-0-3', 'Candidate ID Received'),
    ('1-0-4', 'Candidate Security Packet Received'), -- Typo in PDF? Should be 'Candidate'?
    ('1-0-5', 'Packet Submitted to SOSi Security'),
    ('2-0', 'Personnel Security Request'),
    ('2-0-1', 'Personnel Identification Verification (1)'),
    ('2-0-2', 'Personnel Identification Verification (2)'),
    ('2-0-3', 'Employment Reference form'),
    ('2-0-4', 'Request for Temporary Eligibility'),
    ('2-0-5', 'Security Package Checklist'),
    ('2-0-6', 'Declaration for Federal Employment'),
    ('2-0-7', 'Drug Activity Questionnaire'),
    ('2-0-8', 'Authorization for Release of Credit Report'),
    ('2-0-9', 'Financial History Questionnaire'),
    ('2-0-10', 'Authorization for Social Security (SSA)'),
    ('2-0-16', 'Non-Disclosure Sensitive Info'), -- Assuming this is the full name
    ('2-0-17', 'Self-Reporting'), -- Assuming this is the full name
    ('2-0-21', 'Fingerprints') -- Simplified name?
ON CONFLICT (doc_name) DO NOTHING; -- Avoid errors if run multiple times



-- Candidate Documents Table: Tracks the status of each document for each candidate
CREATE TABLE candidate_documents (
    candidate_doc_id SERIAL PRIMARY KEY,
    candidate_id INT NOT NULL,
    doc_type_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Missing', -- e.g., 'Missing', 'Submitted', 'Approved', 'Rejected', 'Form Compliant'
    submission_date TIMESTAMPTZ NULL, -- When submitted/uploaded by anyone
    approval_date TIMESTAMPTZ NULL, -- When marked as approved/compliant by admin
    uploaded_file_path VARCHAR(1024) NULL, -- Path/URL in Google Cloud Storage
    uploaded_by_user_id INT NULL, -- Who uploaded it (links to users table)
    notes TEXT NULL, -- Admin notes specific to this document instance
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_candidate
        FOREIGN KEY(candidate_id)
        REFERENCES candidates(candidate_id)
        ON DELETE CASCADE, -- If candidate is deleted, remove their document records
    CONSTRAINT fk_doc_type
        FOREIGN KEY(doc_type_id)
        REFERENCES document_types(doc_type_id)
        ON DELETE RESTRICT, -- Prevent deleting a doc_type if it's in use
    CONSTRAINT fk_uploaded_by_user
        FOREIGN KEY(uploaded_by_user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL, -- If uploading user is deleted, keep record but nullify user link
    CONSTRAINT uq_candidate_document UNIQUE (candidate_id, doc_type_id) -- Ensure only one record per candidate per document type
);

-- Trigger for candidate_documents table updated_at
CREATE TRIGGER set_timestamp_candidate_documents
BEFORE UPDATE ON candidate_documents
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

